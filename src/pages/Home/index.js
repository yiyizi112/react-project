import { Bar } from "@/components/Bar"

const Home = () =>{
    return (
        <div>
            <Bar title = '主流框架使用满意度'
                xData = {['react', 'vue', 'angular']}
                yData = {[30,40,50]}
                style = {{ width:'500px', height:'400px'}}
            />

            <Bar title = '主流框架使用满意度2'
                xData = {['react', 'vue', 'angular']}
                yData = {[60,70,20]}
                style = {{ width:'600px', height:'300px'}}
            />
        </div>
    )
}
export default Home