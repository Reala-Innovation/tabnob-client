import axios from "axios";

const api=axios.create({
    baseURL:"https://api.tapnob.com"
})

export default api