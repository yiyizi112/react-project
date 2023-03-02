import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


//react中获取dom节点  ==> useRef
function Bar ({title, xData, yData, style}) {
    const domRef = useRef()
    const chartInit = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(domRef.current);   //抽离出dom节点
        // 绘制图表
        myChart.setOption({
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: yData
                }
            ]
        });
    }

    //初始化该函数
    useEffect(() => {
        chartInit()
        // return () => {
        //     echarts.dispose(domRef.current)
        // }
    }, [])
    return (
        <div>
            <div ref={domRef} style= {style}></div>
        </div>)
    
}
export {
    Bar
}