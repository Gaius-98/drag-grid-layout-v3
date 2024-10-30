import { DgGridInfo,DgPosition,DgPositionPx,DgPositionType } from "../types"
export const debounce = (func: Function, wait: number):(...args:any[])=>void => {
  let time: number | null = null
  return (...args:any[]) => {
    if (time) clearTimeout(time)
    time = window.setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
export const throttle = (func:Function, wait:number):(...args:any[])=>void => {
  let time:number | null = null
  return (...args:any[]) => {
    if (!time) {
      func.apply(this, args)
      time = window.setTimeout(() => {
        time = null
      }, wait)
    }
  }
}
/**
 * 获取元素位置及大小信息
 * @param el 
 * @returns 
 */
export const getElePosition = (el:HTMLElement):DgPositionPx =>{
    const {left,top,width,height}  = el.getBoundingClientRect()
    console.log(left,top,width,height)
    return {
        left:left + 'px',
        top:top + 'px',
        width:width + 'px',
        height:height + 'px'
    }
}

export const position2Grid = (posisitonInfo:DgPositionPx,
    gridInfo:DgGridInfo
) =>{
    const {left,top,width,height} = transformObjectStr(posisitonInfo)
    const {colWidth,rowHeight} = gridInfo
    const colStart = Math.round(left / colWidth)
    const rowStart = Math.round(top/rowHeight)
    const colSpan = Math.round(width/colWidth)
    const rowSpan = Math.round(height/rowHeight)
    console.log(height,rowHeight)
    return `
    ${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}
    `
}



export const transformObjectStr = (posisitonInfo:DgPositionPx):DgPosition =>{
    let obj:DgPosition = {
        left:0,
        top:0,
        width:0,
        height:0
    }
     Object.keys(posisitonInfo).map((key)=>{
        obj[key as DgPositionType] = parseFloat(posisitonInfo[key  as DgPositionType])
    })
    return obj
}
/**
 * 提取grid布局参数
 * @param gridArea 
 * @returns 
 */
export const compileGridInfo = (gridArea:string) =>{
    const regex = /(\d+)\s*\/\s*(\d+)\s*\/\s*span\s*(\d+)\s*\/\s*span\s*(\d+)/;
    const match = gridArea.match(regex);
    if(match){
        return {
            rowStart : match[1],
            colStart : match[2],
            rowSpan :match[3],
            colSpan :match[4],
        }
    }else{
        console.warn(`请检查传入参数:${gridArea}`)
    }
    
}