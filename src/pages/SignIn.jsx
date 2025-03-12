import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export default function SignIn() {
  const navigate = useNavigate();
  const { handleGoogleSignIn } = useAuth();

  const signIn = async () => {
    handleGoogleSignIn()
      .then((result) => {
        console.log('Signed in with:', result);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-teal-900">
        <div className="flex items-center text-neutral-50">
          <img src="./book_logo.png" alt="Logo" className="w-20" />
          <h1 className="text-4xl">BiblioTrack</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-96 w-96 flex-col justify-center rounded-md bg-neutral-50 p-4 shadow-lg">
          <h1 className="mb-3 text-center text-2xl">Sign in</h1>
          <button onClick={signIn} className="w-60 self-center">
            <img src="./signin_google.png" alt="Google Logo" />
          </button>
        </div>
      </div>
    </div>
  );
}
