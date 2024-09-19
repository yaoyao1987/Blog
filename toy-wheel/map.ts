interface Address {
  location?: {
    /**
     * 经度
     */
    lng: number
    /**
     * 纬度
     */
    lat: number
  }
}

export const handleAddress = (list: Address[]) => {
  let num = 0
  return list.reduce((pre: Address[], cur) => {
    // 判断当前地址是否与已处理过的地址重合
    const { location } = cur;
    const isCoincide = pre.some(val => {
      const { location: hasLocation } = val
      // 如果经纬度都相同，则表示地址重合
      return hasLocation?.lng === location?.lng && hasLocation?.lat === location?.lat
    })
    if (isCoincide) {
      // 调用函数处理重合点，返回新的经纬度
      const { lng, lat } = changeCoincidePoint(location, ++num, list.length)
      // 将处理后的地址添加到已处理过的地址列表中
      pre.push({
        ...cur,
        location: {
          lng, lat
        }
      })
    } else {
      pre.push(cur)
    }
    return pre
  }, [])
}

const changeCoincidePoint = (location: Address['location'], num: number, length: number) => {
  const LNG = 0.000172
  const LAT = 0.000086
  const radians = (num * 2 * Math.PI) / length
  const { lng = 0, lat = 0} = location || {}
  return {
    lng: lng + LNG * Math.cos(radians),
    lat: lat + LAT * Math.sin(radians)
  }
}

const setCricleBestViewport =  (point: Address['location'], radius: string, map: any, bMap: any) => {
  let zoom = 20
  let num = 20
  while(num < +radius) {
    num = num * 2
    zoom--
  }

  map.centerAndZoom(new bMap.Point(point?.lng, point?.lat), zoom)
}
