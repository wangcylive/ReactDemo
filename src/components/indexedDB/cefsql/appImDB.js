const keys = [
  {
    name: 'sendId',
    desc: 'varchar(255) not null primary key'
  },
  {
    name: 'appid',
    desc: 'varchar(255)'
  },
  {
    name: 'cmid',
    desc: 'varchar(255)'
  },
  {
    name: 'messageType',
    desc: 'tinyint'
  },
  {
    name: 'offset',
    desc: 'int'
  },
  {
    name: 'receiveId',
    desc: 'varchar(255)'
  },
  {
    name: 'roomId',
    desc: 'varchar(255)'
  },
  {
    name: 'sendTime',
    desc: 'integer'
  },
  {
    name: 'rollbackTime',
    desc: 'integer'
  },
  {
    name: 'text',
    desc: 'varchar(2000)'
  },
  {
    name: 'uid',
    desc: 'int'
  },
  {
    name: 'ids',
    desc: 'varchar(255)'
  },
  {
    name: 'meta',
    desc: 'varchar(2000)'
  },
  {
    name: 'model',
    desc: 'varchar(4000)'
  },
  {
    name: 'extendInfo',
    desc: 'varchar(4000)'
  }
]
