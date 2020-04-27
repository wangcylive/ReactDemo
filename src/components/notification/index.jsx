import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'

async function notifyMe() {
  if (typeof window.Notification !== 'function') {
    throw new Error('This browser does not support desktop notification.')
  }

  if (Notification.permission === 'denied') {
    await Notification.requestPermission()
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification("Hi，你好", {
      icon: 'data:image/ico;base64,AAABAAEAMDAAAAEAIACoJQAAFgAAACgAAAAwAAAAYAAAAAEAIAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOZcigDlW4ky5VuJi+VbicvlW4nx5VuJ/+Vbif/lW4n/5VuJ/+Vbif/kW4r/4VuO/99akf/cWpX/2VmY/9ZZnP/TWJ//0Fej/81Xpv/LV6r/yFat/8VWsf/CVbT/v1W4/7xUvP+6VL//t1PD/7RTxv+xU8r/rlLN/6tS0f+oUdT/plHY/6NQ2/GgUN/LnVDii5tP5TKaT+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5VuKJOVbibXlW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/41uM/+Baj//dWpP/2lmW/9dZmv/UWJ7/0lih/89Xpf/MV6j/yVas/8ZWr//DVbP/wVW2/75Uuv+7VL3/uFTB/7VTxP+yU8j/sFLM/61Sz/+qUdP/p1HW/6RQ2v+hUN3/n0/h/5xP5P+ZT+e1mE/pJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlW4lO5VuJ8eVbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5FuK/+Fbjv/eWpH/3FqV/9lZmP/WWJz/01if/9BYo//NV6b/y1eq/8hWrf/FVrH/wlW0/79VuP+8VLz/ulS//7dUw/+0U8b/sVPK/65Szf+sUtH/qVHU/6ZR1/+jUNv/oFDe/55P4v+bT+X/mE/o8ZdP6k4AAAAAAAAAAAAAAAAAAAAAAAAAAOVbiU7lW4n75VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+NbjP/gWo//3VqT/9pZlv/YWZr/1Vid/9JYof/PWKT/zFeo/8lXq//HVq//xFaz/8FVtv++Vbn/u1S9/7hUwP+2U8T/s1PH/7BSy/+tUs7/q1HS/6hR1f+lUdn/olDc/6BP3/+dT+P/mk/m/5hO6fuXT+pOAAAAAAAAAAAAAAAA5VuJJOVbifHlW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Rbiv/iWo3/31qR/9xZlP/ZWZj/1lmb/9NYn//RWKL/zlem/8tXqf/IVq3/xVaw/8NVtP/AVbf/vVS7/7pUvv+3U8L/tVPF/7JTyf+vUsz/rFLP/6pR0/+nUdb/pFDZ/6JQ3f+fT+D/nU/j/5pP5v+YT+jxmE/pJAAAAADlXIoA5VuJteVbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/jW4v/4FqP/91akv/bWZb/2FmZ/9VYnf/SWKD/0Fik/81Xp//KV6v/x1au/8RWsv/CVbX/v1W5/7xUvP+5VL//t1PD/7RTxv+xU8n/r1LN/6xS0P+pUdP/p1HX/6RQ2v+iUN3/n1Dg/51P4/+bT+X/mU/ntZpP6ADlW4ky5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4r/4luN/99akP/cWpT/2lmX/9dZm//UWJ7/0Vii/85Xpf/MV6j/yVas/8ZWr//EVrP/wVW2/75Vuf+7VL3/uVTA/7ZTxP+zU8f/sVLK/65Szf+sUtH/qVHU/6dR1/+kUNr/olDd/6BP3/+eT+L/nE/k/5tP5TLlW4mL5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5FuL/+Fajv/eWpH/21mV/9lZmP/WWJz/01if/9BYo//OV6b/y1ep/8hWrf/FVrD/w1W0/8BVt/+9VLr/u1S+/7hUwf+1U8T/s1PH/7BSy/+uUs7/q1HR/6lR1P+nUdf/pFDZ/6JQ3P+gUN7/n0/h/55Q4ovlW4nL5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+NbjP/gWo//3VqT/9tZlv/YWZr/1Vid/9JYoP/QWKT/zVen/8pXqv/IVq7/xVax/8JVtP/AVbj/vVW7/7pUvv+4VMH/tVPF/7NTyP+wUsv/rlLO/6xS0f+pUdP/p1HW/6VR2f+jUNv/oVDd/6BQ38vlW4nx5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Rbiv/iW43/31qQ/9xalP/aWZf/11ma/9RYnv/SWKH/z1el/8xXqP/KV6v/x1au/8RWsv/CVbX/v1W4/71Vu/+6VL//uFTC/7VTxf+zU8j/sFLL/65Szf+sUtD/qlHT/6hR1f+mUdj/pFDa/6NQ2/HlW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/kW4v/4VqO/95akf/cWZX/2VmY/9ZZm//UWJ//0Vii/85Xpf/MV6n/yVes/8dWr//EVbL/wVW1/79Vuf+8VLz/ulS//7hTwv+1U8X/s1PH/7FSyv+vUs3/rFLP/6tR0v+pUdT/p1HW/6ZQ2P/lXIj/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/41uL/+Baj//eWpL/21qV/9hZmf/WWJz/01if/9FYo//OV6b/y1ep/8lWrP/GVq//xFay/8FVtv+/Vbn/vFS8/7pUv/+4VMH/tVPE/7NTx/+xU8n/r1LM/61Szv+sUtH/qlHT/6hR1P/mXob/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuK/+JbjP/gWo//3VqT/9tZlv/YWZn/1Vid/9NYoP/QWKP/zlem/8tXqf/JVqz/xlaw/8RVs//BVbb/v1W4/71Vu/+6VL7/uFTB/7ZTxP+0U8b/slPJ/7BSy/+uUs3/rVLP/6tS0f/mYIT/5V2H/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/52eS/+h1nf/mdZ//4WaY/91ak//aWZf/2Fma/9VYnf/SWKD/0Fej/81Xpv/LV6n/yVas/8ZWsP/EVbL/wVW1/79VuP+9VLv/u1S+/7lUwP+3U8P/tVPF/7NTx/+xUsr/sFLL/65Szf/nYoL/5l+F/+VciP/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/6HGZ//O0yf/75+7//v39//7+/v/+/v7//vz9//nm7v/uss3/3m6k/9dZmv/VWJ3/0lig/9BYo//NV6b/y1ep/8lWrP/GVq//xFay/8JVtf+/Vbj/vVW6/7tUvf+5VL//t1TC/7ZTxP+0U8b/slPI/7FTyv/oZID/52GD/+Zehv/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/mXov/6nie/+t/o//naJP/5VuJ/+Vbif/lW4n/5VuJ/+ZgjP/zs8j//vv8//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//fr7/+yvzf/YXJ3/1Vid/9JYoP/QWKP/zVem/89lsf/UfL//0HO9/8VYs//CVbT/wFW3/75Vuf+8VLz/ulS+/7hUwP+3U8P/tVPE/7RTxv/oZ37/52OB/+ZghP/lXYf/5VuJ/+Vbif/lW4n/5VyK/++euf/87vL//v7+//7+/v/++/z/9srZ/+hulv/lW4n/52WR//jX4v/+/v7//v7+//7+/v/+/v7/++zx//jW4v/41+L/++3y//7+/v/+/v7//v7+//7+/v/00+T/2WGg/9VYnf/YbKz/8Mvi//38/f/+/v7//v7+//js9v/bmND/w1a0/8FVtv+/Vbj/vVS7/7tUvf+6VL//uFTB/7dTw//paXz/6GZ//+digv/mX4X/5VyI/+Vbif/lW4n/8rPI//7+/v/+/v7//v7+//7+/v/+/v7//v7+//vs8f/pdpz/+NXg//7+/v/+/v7//v7+//XF1f/qep//5VyK/+Vbif/lW4n/5VyK/+p7oP/1x9f//v7+//7+/v/+/v7/9NHi/951rP/67vX//v7+//7+/v/+/v7//v7+//7+/v/+/v7/4qzZ/8RWs//CVbX/wFW3/75Vuf+8VLv/u1S9/7pUv//pa3r/6Gh9/+hlgP/nYoP/5l6G/+Vcif/rgaT//v39//7+/v/+/v7/+eHp//fQ3f/9+Pr//v7+//7+/v/9+vv//v7+//7+/v/9+fr/7ZGw/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/7ZSz//36+//+/v7//v7+//36+//+/v7//v7+//z3+v/xzuP/9uLv//7+/v/+/v7//v39/9J5wP/EVrL/w1W0/8FVtv+/Vbj/vlS6/7xVvP/qbXj/6Wp7/+hnfv/nZIH/5mGE/+Zdh//1wNH//v7+//7+/v/zuc3/5VyK/+Vbif/pd53//O7z//7+/v/+/v7//v7+//7+/v/uk7H/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+2Xtf/+/v7//v7+//7+/v/+/v7/+uzz/9xyrP/TWJ//0Vmj/+y82v/+/v7//v7+/+i63f/HVq7/xVaw/8RVsv/CVbT/wVW2/79VuP/qcHb/6m15/+lpfP/oZn//52OC/+ZghP/53OX//v7+//7+/v/ob5f/5VuJ/+Vbif/lW4n/6Xed//zw9P/+/v7//v7+//bK2f/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/2ztz//v7+//7+/v/77vP/4HOm/9hZmf/WWZz/1Fif/9hwr//+/v7//v7+//LX6v/KV6v/yFat/8dWr//FVrH/w1az/8JVtf/rcnT/6m93/+lsev/paXz/6GV//+digv/42eH//v7+//7+/v/qep//5VuJ/+Vbif/lW4n/5VuJ//nd5//+/v7//v7+/+t/o//lW4n/5mOP//fQ3f/53uf/6XOa/+Vbif/lW4n/6XWc//nf6P/3ztz/5mKO/+Vbif/rhKb//v7+//7+/v/32eb/3VqT/9pZlv/YWZn/1lmb/918sv/+/v7//v7+//HS5//NV6f/y1ep/8lXq//IVq3/xlav/8VWsf/sdXL/63F1/+pud//pa3r/6Gh9/+hlgP/ztsT//v7+//7+/v/41+L/5l+M/+Vbif/lW4n/5mCN//35+v/+/v7//PL1/+Vdi//lW4n/7Y+v//7+/v/+/v7/8rDG/+Vbif/lW4n/87TJ//7+/v/+/v7/7Ius/+Vbif/mX4z//PX3//7+/v/99/n/4F2S/91ak//bWZX/2l6b//XZ6P/+/v7//v7+/+is0f/QV6T/zlem/8xXqP/LVqr/yVas/8hWrf/sd2//7HRy/+txdf/qbnj/6Wp7/+hnfv/qd4///ff4//7+/v/+/v7/7Y+u/+Vbif/lW4n/6GuV//7+/v/+/v7/+d3m/+Vbif/lW4n/7pOx//7+/v/+/v7/87TJ/+Vbif/lW4n/87jM//7+/v/+/v7/7Y+u/+Vbif/lW4n/+uHp//7+/v/+/f7/5GeV/+Baj//eWpL/6JK4//7+/v/+/v7//PX5/9hqqP/SWKD/0Vii/89YpP/NV6b/zFeo/8tXqv/teW3/7HZw/+tzc//rcHb/6m15/+lqe//qd4z//fb3//7+/v/+/v7/7ZCv/+Vbif/lW4n/6GuV//7+/v/+/v7/+dzm/+Vbif/lW4n/7pOx//7+/v/+/v7/87TJ/+Vbif/lW4n/87jM//7+/v/+/v7/7Y+u/+Vbif/lW4n/+uHp//7+/v/+/v7/5meT/+JbjP/gWo//6pS3//7+/v/+/v7//PP4/9popP/VWJ3/01if/9JYof/QWKP/z1el/81Xpv/ufGv/7Xlu/+x2cf/rc3P/6m92/+psef/0t7///v7+//7+/v/52+P/5mKL/+Vbif/lW4n/5mGN//35+//+/v7//PH0/+Vdiv/lW4n/7ZCv//7+/v/+/v7/8rHH/+Vbif/lW4n/87XK//7+/v/+/v7/7Yys/+Vbif/mXov//PT3//7+/v/99/n/5l+M/+Vbiv/jW4v/4mCS//jd5//+/v7//v7+/+ury//YWZn/1lmb/9VYnf/TWJ//0lih/9BXo//ufmn/7ntr/+14bv/sdXH/63J0/+pvd//5297//v7+//7+/v/sgpv/5mCF/+Vdh//lW4n/5VuJ//nf6P/+/v7//v7+/+p9of/lW4n/52WQ//jW4f/65Ov/6Xac/+Vbif/lW4n/6Xie//rl7P/41OD/5mOP/+Vbif/rgaT//v7+//7+/v/52+X/5VuJ/+Vbif/lW4n/5FuL/+h/pv/+/v7//v7+//XS4v/bWZb/2VmY/9hZmv/WWZz/1Vie/9NYn//vgWb/7n5p/+17bP/teG//7HVy/+tydP/64OL//v7+//7+/v/qd47/52KC/+Zfhf/lXIj/6XOa//zu8v/+/v7//v7+//XG1v/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/2ytn//v7+//7+/v/77PH/6HGZ/+Vbif/lW4n/5VuJ/+hymv/+/v7//v7+//fY5f/eWpL/3FqU/9pZlv/ZWZj/11ma/9ZZnP/wg2T/74Bn/+59av/temz/7Hdv/+x0cv/3ysv//v7+//7+/v/0usX/6GaA/+dig//qdpf/++zx//7+/v/+/v7//v7+//79/v/tjq7/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+2Ssf/+/v7//v7+//7+/v/+/v7/++nv/+hxmf/lW4n/5VyK//O5zP/+/v7//v7+//O90f/gWo//31qR/91ak//cWZX/2lmW/9lZmP/whmL/8INk/++AZ//ufWr/7Xpt/+x3cP/wl5X//v7+//7+/v/+/v7/+d7j//fM1v/99vj//v7+//7+/v/++/z//v7+//7+/v/99/n/7Iys/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/7Y6u//34+v/+/v7//v7+//77/P/+/v7//v7+//319//2ydj/+d3m//7+/v/+/v7//v39/+qApP/jW4v/4VuN/+Baj//eWpH/3VqT/9xalf/xiV//8IZi/++DZf/vf2j/7nxq/+15bf/sdnD/9sPC//7+/v/+/v7//v7+//7+/v/+/v7//v7+//zv8//qe5//+Nnj//7+/v/+/v7//v39//S/0f/pdJv/5VuJ/+Vbif/lW4n/5VyK/+l2nP/1wdL//v39//7+/v/+/v7/+Nbh/+p8of/88fT//v7+//7+/v/+/v7//v7+//7+/v/+/v7/87TJ/+Vbif/lW4n/5FuK/+NbjP/hWo7/4FqP/99akf/yi13/8Yhg//CFYv/vgmX/7n9o/+58a//teW3/7Hdx//Sysf/99PT//v7+//7+/v/+/f3/+NPa/+p2k//mX4b/52iR//nb5f/+/v7//v7+//7+/v/+/f3/+uft//fQ3f/30d3/+ufu//79/v/+/v7//v7+//7+/v/42eP/52aR/+Vbif/pc5r/99Le//79/f/+/v7//v7+//zx9f/wobz/5VyK/+Vbif/lW4n/5VuJ/+Vbif/kW4r/41uM/+Fajv/yjlr/8otd//GIYP/whWP/74Jm/+5/aP/ufGv/7Xlu/+x2cP/sd3f/746S/++Tm//reon/6Gd+/+dkgP/nYoP/5l+G/+ZijP/zucz//vz9//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//vz8//O2yv/mYI3/5VuJ/+Vbif/lW4n/5VuJ/+hul//rhqj/6n2i/+ZgjP/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Rbiv/zkFj/8o1b//GKXv/xh2D/8IRj/++BZv/uf2j/7nxr/+15bv/sdnH/63Nz/+pwdv/qbXn/6Wp7/+hnfv/nZID/52GD/+Zfhv/lXIj/6Xac//S7zv/77fL//v3+//7+/v/+/v7//v3+//vs8f/zuc3/6XSb/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/0k1b/85BY//KNW//xil7/8Ydh//CEY//vgWb/7n5p/+57a//teG7/7HZx/+tzc//qcHb/6m15/+lqe//oZ37/52SA/+dig//mX4X/5VyI/+Vbif/lXIr/6GyV/+p8oP/qe6D/6GyV/+Vciv/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/0llP/9JNW//OQWf/yjVv/8Ype//GHYf/whGP/74Fm/+5+af/ue2z/7Xhu/+x2cf/rc3P/6nB2/+ptef/panv/6Gd+/+hlgP/nYoP/5l+F/+VciP/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/1mVH/9JZT//STVv/zkFn/8o1c//GKXv/xh2H/8IRk/++BZv/ufmn/7Xts/+14bv/sdXH/63Nz/+pwdv/qbXn/6Wp7/+hofv/oZYD/52KD/+Zfhf/lXYf/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/2m07/9ZhR//SVVP/0klb/849Z//KMXP/xil7/8Idh//CEZP/vgWb/7n5p/+17bP/teG7/7HZx/+tzc//rcHb/6m14/+lqe//oaH3/6GWA/+digv/mYIX/5l2H/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/3nkzx9ptO//WYUf/0lVT/9JJW//OPWf/yjFz/8Yle//CHYf/whGT/74Fm/+5+af/ue2v/7Xhu/+x2cf/rc3P/63B2/+pteP/pa3v/6Gh9/+hlgP/nY4L/5mCE/+Zdh//lXIn/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+VbifH3oErL955M//abT//1mFH/9JVU//SSV//zj1n/8oxc//GJXv/wh2H/8IRk/++BZv/ufmn/7ntr/+15bv/sdnD/63Nz/+twdf/qbnj/6Wt6/+loff/oZn//52OC/+ZhhP/mXob/5VyI/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbicv4o0eL96FJ//eeTP/2m0//9ZhR//SVVP/0klf/849Z//KMXP/xiV7/8Idh//CEZP/vgWb/7n5p/+58a//teW7/7HZw/+tzc//rcXX/6m54/+lrev/paXz/6GZ//+dkgf/nYYP/5l+G/+VciP/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+VbiYv5pUYy+KNH//egSf/3nkz/9ptP//WYUf/0lVT/85JX//OPWf/yjFz/8Ype//GHYf/whGT/74Fm/+5/aP/ufGv/7Xlt/+x2cP/sdHL/63F1/+pud//pbHr/6Wl8/+hnfv/nZIH/52KD/+Zfhf/mXYf/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vbif/lW4n/5VuJ/+Vb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',
      body: '😂，我来了',
    })
    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }
}

const NotificationDemo = () => {
  useEffect(() => {

  }, [])

  const onClick = () => {
    notifyMe()
  }


  return <div>
    <button onClick={onClick}>通知</button>
  </div>
}

export default hot(NotificationDemo)