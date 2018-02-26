import service from '@/utils/request'

export const postRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const uploadFileRequest = (url, params) => {
  return service({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const putRequest = (url, params) => {
  return service({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return service({
    method: 'delete',
    url: `${url}`
  })
}

export const getRequest = (url, pv) => {
  return service({
    url: `${url}`,
    method: 'get',
    data: { pv },
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const getRequest1 = (url, pv) => {
  console.log('pv' + pv)
  return service.get(`${url}`, {
    pv
  })
}
