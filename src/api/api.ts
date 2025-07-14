import axios from "axios";

const api=axios.create({
    baseURL:"https://staging-api.tapnob.com"
})

export default api