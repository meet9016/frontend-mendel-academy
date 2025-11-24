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
    getAppMedicalExam?: string;
    getMedicalById?: string;

    //my cart
    getCart?: string;
    postCreateAddToCart?: string;
    cartCount?:string;

    //faq
    getAllFaq?: string;

    //User Reagister
    userRagisterCreate?: string

    //Payment
    verifyStripePayment: string;
    createStripePaymentIntent: string;
    getPlan: string;

    //UpComing
    getUpComingCourses: string;
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

    //medical exam
    getAppMedicalExam: 'examlist/exam-category-list',
    getMedicalById: 'examlist/getById',

    //my cart
    getCart: 'cart/get',
    postCreateAddToCart: 'cart/create',
    cartCount:'cart/count',

    //faq
    getAllFaq: 'faq/getall',

    //User Reagister
    userRagisterCreate: 'contactus/create',

    //Payment
    verifyStripePayment: 'payment/verify-payment-stripe',
    createStripePaymentIntent: 'payment/create-payment-intent',
    getPlan: 'examlist/get-plan',

    //UpComing
    getUpComingCourses: 'upcomming/getall'
};

export default endPointApi;