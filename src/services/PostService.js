import axios from 'axios';

const POST_DISH_URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes';

class PostService {

    postDish(dish) {
        return axios.post(POST_DISH_URL, dish);
    }

}

export default new PostService;