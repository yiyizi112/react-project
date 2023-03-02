import Home from "@/pages/Home"
import Article from "@/pages/Article"
import Publish from "@/pages/Publish"


const routes = [{
    path: '/',
    element: <Home/>
}, {
    path:'/article',
    element: <Article/>
}, {
    path:'/publish',
    element: <Publish/>
}]

export {
    routes
}