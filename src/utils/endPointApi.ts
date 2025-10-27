export interface EndPointApi {
    login: string;
    register: string;
    logout: string;

    //Blogs
    getAllBlogs?: string;
    getBlogById?: string;
    createBlog?: string;
    updateBlog?: string;
    deleteBlog?: string;

    //Question
    getAllQuestion?: string;
    createQuestion?: string;
    updateQuestion?: string;
    deleteQuestion?: string;
}

// Define and export the API endpoint object
const endPointApi: EndPointApi = {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',

    //Blogs
    getAllBlogs: 'blogs/getall',
    getBlogById: 'blogs/getById',
    createBlog: 'blogs/create-blogs',
    updateBlog: 'blogs',
    deleteBlog: 'blogs/delete',

    //Question
    getAllQuestion: 'question/getall',
    createQuestion: 'question/create-question',
    updateQuestion: 'question/update',
    deleteQuestion: 'question/delete',
};

export default endPointApi;