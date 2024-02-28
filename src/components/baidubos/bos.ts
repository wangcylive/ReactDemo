import {BosClient} from '@baiducloud/sdk'
const API_BASE = 'https://f2c-api-test.yy.com'

interface ApplyUploadParams {
  businessId: number // required 业务id
  configId: number // required 配置id，如果 <=0 的话就自动生成一个
  configName: string // required 配置名称
  bucketId: number // required 选择的 bucketId, 对应业务列表 中 buckets 列表中的id
  tags: string[] // 标签，表示该配置存储的数据有哪些
  uploadFiles: string[] // 本次要上传的文件列表，包括生成的文件也需要预先定义好名称, 后端根据数组顺序为数组中每个文件名生成对应的上传文件名称
}

interface ApplyUploadRes {
  code: number // 业务响应码 0 - 成功，其余失败，失败信息查看 msg
  msg: string // 错误消息
  serverTime: number // 服务端时间，毫秒
  data: {
    applyId: number // 申请ID,后端自动生成
    businessId: number // 所属业务ID
    configId: number // 所属配置id,配置id，如果 null 或者 <=0 则后台会创建一个
    configName: string // 配置名称
    version: number // 版本号
    bucketId: number // 所选bucketId
    tags: string[] // 本次上传的标签
    createUid: number // 创建者uid
    createTime: number // 创建时间
    uploadToken: {
      ak: string
      sk: string
      bucket: string
      expiration: number // token过期时间,毫秒级时间戳
      token: string
      endpoint: string
      baseUrl: string // 文件名访问前缀，baseUrl + uploadFilename 就是完整的文件访问URL
      pathPrefix: string // 上传文件前缀，形如 test/f2c/1/1/2 待上传的文件名称应该是 pathPrefix + "/" + 随机文件名.文件后缀
      uploadFiles: string[] // 上传到云存储所使用的 文件名, 和 请求中 uploadFiles 数组一一对应
    }
  }
}

async function applyUpload(params: ApplyUploadParams): Promise<ApplyUploadRes> {
  const res = await fetch(API_BASE + '/manage/config/applyUpload?testLoginUid=50047211', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  return res.json()
}

// 不同code含义 0：上传成功，1：上传中  -1： 上传失败 -2：大小超出限制 -3:文件类型错误
export const upload = async ({bosconfig, bucket, key, file, cb, url}): Promise<string> => {
  return new Promise((resolve, reject) => {
    //通过sts方式访问bos: https://cloud.baidu.com/doc/BOS/s/Hjwvyri9y#%E9%80%9A%E8%BF%87sts%E6%96%B9%E5%BC%8F%E8%AE%BF%E9%97%AEbos
    // console.log('upload params', bosconfig, bucket, key, file, url)
    const cbRes = {
      code: -1,
      data: {
        url: '',
        progress: '',
      },
    }
    const client = new BosClient(bosconfig)
    const fileType = (file.name && file.name.split('.').pop()) || 'png'
    console.log('fileType', fileType)
    // const fileType = 'png'
    // const key = `/hgame_${env}_` + Math.random().toString().split('.')[1] + '.' + fileType // 保存到bos时的key，您可更改，默认以文件名作为key
    // const url = 'https://makefriends.su.bcebos.com/' + key
    // const url = 'https://makefriends.bs2dl.yy.com' + key
    console.log('url', url)
    client
      .putObjectFromFile(bucket, key, file, {'Content-Type': 'image/png'})
      .then(function (res) {
        // 上传完成，添加您的代码
        cb &&
          cb({
            code: 0,
            data: {
              url: url,
              progress: 100,
            },
          })

        resolve(url)
      })
      .catch(async function (err) {
        console.log('upload err', err)
        // 上传失败，添加您的代码
        if (err.status_code === 400) {
          return await upload(file, cb)
        } else {
          console.log('err', err)
          cb && cb({...cbRes, code: -1})
        }
      })
    client.on('progress', function (evt) {
      // 监听上传进度
      if (evt.lengthComputable) {
        // 添加您的代码
        const percentage = parseInt((evt.loaded / evt.total) * 100)
        console.log('上传中，已上传了' + percentage + '%')
        cb &&
          cb({
            code: 0,
            data: {
              url: '',
              progress: percentage,
            },
          })
      }
    })
  })
}

function typeArrayToBlob(typeArray: Uint8Array) {
  const af = typeArray.buffer
  const blob = new Blob([af])
  return blob
}

/**
 * 批量上传图片
 * @param typeArray
 */
export async function uploadImages(typeArray: File[]): Promise<string[]> {
  // const blob = typeArray.map(item => typeArrayToBlob(item))
  // console.log('test', blob)
  // return
  const res = await applyUpload({
    businessId: 10000,
    configId: 1,
    configName: 'test',
    bucketId: 10000,
    tags: ['img'],
    uploadFiles: typeArray.map(item => item.name),
  })

  if (res.code !== 0) {
    return new Error('error')
  }

  const {uploadToken} = res.data
  const {ak, sk, token, endpoint, uploadFiles, baseUrl, bucket} = uploadToken
  const bosconfig = {
    endpoint: 'https://' + endpoint,
    credentials: {
      ak, // 您的AccessKey
      sk, // 您的SecretAccessKey
    },
    sessionToken: token,
  }

  const promiseAll: Promise<string>[] = []

  for (let i = 0; i < typeArray.length; i++) {
    const key = uploadFiles[i]
    const url = baseUrl + key
    const af = await typeArray[i].arrayBuffer()
    promiseAll.push(
      upload({
        bosconfig,
        bucket,
        key,
        file: af,
        url,
        cb: () => {
          console.log('done')
        },
      }),
    )
  }

  return Promise.all(promiseAll)
}
