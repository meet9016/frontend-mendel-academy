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
    getPlan?: string;

    //faq
    getAllFaq?: string;

    //User Reagister
    userRagisterCreate?: string
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
    getPlan: 'examlist/get-plan',

    //faq
    getAllFaq: 'faq/getall',

    //User Reagister
    userRagisterCreate: 'contactus/create',

};

export default endPointApi;