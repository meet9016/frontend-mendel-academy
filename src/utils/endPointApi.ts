export interface EndPointApi {
    login: string;
    register: string;
    logout: string;

    //Blogs
    getAllBlogs?: string;
    getBlogById?: string;

    //Question
    getAllQuestion?: string;

    //Pre-Recorded
    getAllPreRecorded?: string;
    postPaymentCreate?: string;
    postPaymentVerify?: string;

    //medical exam
    
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',

    //Blogs
    getAllBlogs: 'blogs/getall',
    getBlogById: 'blogs/getById',

    //Question
    getAllQuestion: 'question/getall',

    //Pre-Recorded
    getAllPreRecorded: 'prerecorded/getall',

    //Add to cart
    postPaymentCreate: 'payment/create',
    postPaymentVerify: 'payment/verify-payment',

};

export default endPointApi;