import logo from "/unikrew-logo.png"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from "../../redux/features/authApiSlice";
import Spinner from "../../components/Spinner";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    re_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });


export default function SignUp () {
    
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    
    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          re_password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
          register(values)
            .unwrap()
            .then(() => {
                toast.success('Please check your email address for the confirmation email!')
                navigate('/auth/sign-in');
            })
            .catch((error) => {
              console.log(error);
              if (error.data) {
                // Iterate through error fields and display corresponding toast messages
                Object.keys(error.data).forEach((field) => {
                  const errorMessage = error.data[field][0];
                    
                  toast.error(errorMessage);
                });
              } else {
                // Display a generic error message
                toast.error('Invalid email or password!');
              }
            });
        },
    });


    return (
        <>
            <section className="bg-gray-50 dark:bg-white pt-20">
                <div className="flex flex-col items-center justify-center mt-300 px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-32 h-32 mr-2" src={logo} alt="logo">
                        </img>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit} action="#">
                                <div>
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input 
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required="">
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input 
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required="">
                                    </input>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email"
                                        name="email"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange} 
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.errors.email ? 'border-red-500' : ''}`}
                                        placeholder="name@company.com" required="">
                                    </input>
                                    {formik.errors.email && (
                                        <p className="text-sm text-red-500">{formik.errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password"
                                        name="password"
                                        id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        placeholder="••••••••" 
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.errors.password ? 'border-red-500' : ''}`}
                                        required="">
                                    </input>
                                    {formik.errors.password && (
                                        <p className="text-sm text-red-500">{formik.errors.password}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="re_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password"
                                        name="re_password"
                                        id="re_password"
                                        value={formik.values.re_password}
                                        onChange={formik.handleChange}
                                        placeholder="••••••••" 
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.errors.re_password ? 'border-red-500' : ''}`}
                                        required="">
                                    </input>
                                    {formik.errors.re_password && (
                                        <p className="text-sm text-red-500">{formik.errors.re_password}</p>
                                    )}
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                        </input>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    {isLoading ? <Spinner/> : 'Sign Up'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/auth/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}