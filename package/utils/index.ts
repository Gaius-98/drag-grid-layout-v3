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


    const {rowStart,rowSpan,colSpan,colStart}  = transformGrid(posisitonInfo,gridInfo)
    return `
    ${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}
    `
}


export const transformGrid = (posisitonInfo:DgPositionPx,
    gridInfo:DgGridInfo) =>{
      const {left,top,width,height} = transformObjectStr(posisitonInfo)

    const {colWidth,rowHeight} = gridInfo
    const colStart = Math.round(left / colWidth) + 1
    const rowStart = Math.round(top/rowHeight) + 1
    const colSpan = Math.round(width/colWidth)
    const rowSpan = Math.round(height/rowHeight)
    
    return {
      rowStart,
      rowSpan,
      colSpan,
      colStart
    }
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
            rowStart : Number(match[1]),
            colStart : Number(match[2]),
            rowSpan : Number(match[3]),
            colSpan : Number(match[4]),
        }
    }else{
        console.warn(`请检查传入参数:${gridArea}`)
    }
    
}
/**
 * 检测两个元素是否重叠
 * @param elem1 
 * @param elem2 
 * @returns 
 */
export const  isOverlapping = (elem1:HTMLElement, elem2:HTMLElement)=> {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

export const getRelativePosition = (el:HTMLElement) =>{
  const parent = el.parentElement
  const {left,top,width,height} = el.getBoundingClientRect()
  if(parent){
    const {left:pLeft,top:pTop} = parent?.getBoundingClientRect()
    return {
      left:left - pLeft,
      top:top - pTop,
      width,
      height
    }
  }else{
    return {
      left,
      top,
      width,
      height
    }
  }

}




export const collides = (l1: any, l2: any): boolean =>{
  if (l1.id === l2.id) return false; 
  if (l1.rowStart + l1.rowSpan <= l2.rowStart) return false; 
  if (l1.rowStart >= l2.rowStart + l2.rowSpan) return false; 
  if (l1.colStart + l1.colSpan <= l2.colStart) return false; 
  if (l1.colStart >= l2.colStart + l2.colSpan) return false;
  return true; 
}

export const getFirstCollision = (list:any[],item:any) =>{
  for (let i = 0, len = list.length; i < len; i++) {
    if (collides(list[i], item)) return list[i];
  }
}