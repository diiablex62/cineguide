import React, { useState, useContext } from "react";
import { AuthContext } from "../../components/providers/AuthProvider";
import GoogleIcon from "../../components/filtre/icone/google";

export default function Connexion() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex h-screen'>
      {/* Section gauche */}
      <div className='w-1/2 flex justify-center items-center bg-[var(--color-fuchsia)] text-white animate-fuchsia'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-sm'>
          <a
            href='/'
            className='text-sm text-gray-500 hover:underline block text-start mb-10'>
            &lt; Retour vers la page d'accueil
          </a>
          <h2 className='text-center mb-4 text-2xl font-bold text-black'>
            SE CONNECTER
          </h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Entrez votre email'
                className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Mot de passe
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Entrez votre mot de passe'
                  className='w-full p-2 border border-gray-300 rounded focus:ring-[var(--color-fuchsia)] focus:border-[var(--color-fuchsia)] focus:outline-[var(--color-fuchsia)] text-[var(--color-fuchsia)] placeholder-gray-400'
                />
                <span
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer'>
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 122.879 79.699'
                      className='h-5 w-5'
                      fill='currentColor'>
                      <path d='M0.955,37.326c2.922-3.528,5.981-6.739,9.151-9.625C24.441,14.654,41.462,7.684,59.01,7.334 c6.561-0.131,13.185,0.665,19.757,2.416l-5.904,5.904c-4.581-0.916-9.168-1.324-13.714-1.233 c-15.811,0.316-31.215,6.657-44.262,18.533l0,0c-2.324,2.115-4.562,4.39-6.702,6.82c4.071,4.721,8.6,8.801,13.452,12.227 c2.988,2.111,6.097,3.973,9.296,5.586l-5.262,5.262c-2.782-1.504-5.494-3.184-8.12-5.039c-6.143-4.338-11.813-9.629-16.78-15.85 C-0.338,40.563-0.228,38.59,0.955,37.326L0.955,37.326L0.955,37.326z M96.03,0l5.893,5.893L28.119,79.699l-5.894-5.895L96.03,0 L96.03,0z M97.72,17.609c4.423,2.527,8.767,5.528,12.994,9.014c3.877,3.196,7.635,6.773,11.24,10.735 c1.163,1.277,1.22,3.171,0.226,4.507c-4.131,5.834-8.876,10.816-14.069,14.963C95.119,67.199,79.338,72.305,63.352,72.377 c-6.114,0.027-9.798-3.141-15.825-4.576l3.545-3.543c4.065,0.705,8.167,1.049,12.252,1.031c14.421-0.064,28.653-4.668,40.366-14.02 c3.998-3.191,7.706-6.939,11.028-11.254c-2.787-2.905-5.627-5.543-8.508-7.918c-4.455-3.673-9.042-6.759-13.707-9.273L97.72,17.609 L97.72,17.609z M61.44,18.143c2.664,0,5.216,0.481,7.576,1.359l-5.689,5.689c-0.619-0.079-1.248-0.119-1.886-0.119 c-4.081,0-7.775,1.654-10.449,4.328c-2.674,2.674-4.328,6.369-4.328,10.45c0,0.639,0.04,1.268,0.119,1.885l-5.689,5.691 c-0.879-2.359-1.359-4.912-1.359-7.576c0-5.995,2.43-11.42,6.358-15.349C50.02,20.572,55.446,18.143,61.44,18.143L61.44,18.143z M82.113,33.216c0.67,2.09,1.032,4.32,1.032,6.634c0,5.994-2.43,11.42-6.357,15.348c-3.929,3.928-9.355,6.357-15.348,6.357 c-2.313,0-4.542-0.361-6.633-1.033l5.914-5.914c0.238,0.012,0.478,0.018,0.719,0.018c4.081,0,7.775-1.652,10.449-4.326 s4.328-6.369,4.328-10.449c0-0.241-0.006-0.48-0.018-0.72L82.113,33.216L82.113,33.216z' />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 122.88 65.06'
                      className='h-5 w-5'
                      fill='currentColor'>
                      <path d='M0.95,30.01c2.92-3.53,5.98-6.74,9.15-9.63C24.44,7.33,41.46,0.36,59.01,0.01c17.51-0.35,35.47,5.9,51.7,19.29 c3.88,3.2,7.63,6.77,11.24,10.74c1.16,1.28,1.22,3.17,0.23,4.51c-4.13,5.83-8.88,10.82-14.07,14.96 C95.12,59.88,79.34,64.98,63.35,65.06c-15.93,0.07-32.06-4.86-45.8-14.57c-6.14-4.34-11.81-9.63-16.78-15.85 C-0.34,33.24-0.23,31.27,0.95,30.01L0.95,30.01z M61.44,26.46c0.59,0,1.17,0.09,1.71,0.24c-0.46,0.5-0.73,1.17-0.73,1.9 c0,1.56,1.26,2.82,2.82,2.82c0.77,0,1.46-0.3,1.97-0.8c0.2,0.6,0.3,1.24,0.3,1.9c0,3.35-2.72,6.07-6.07,6.07 c-3.35,0-6.07-2.72-6.07-6.07C55.37,29.18,58.09,26.46,61.44,26.46L61.44,26.46z M61.44,10.82c5.99,0,11.42,2.43,15.35,6.36 c3.93,3.93,6.36,9.35,6.36,15.35c0,5.99-2.43,11.42-6.36,15.35c-3.93,3.93-9.35,6.36-15.35,6.36c-5.99,0-11.42-2.43-15.35-6.36 c-3.93-3.93-6.36-9.35-6.36-15.35c0-5.99,2.43-11.42,6.36-15.35C50.02,13.25,55.45,10.82,61.44,10.82L61.44,10.82z M71.89,22.08 c-2.67-2.67-6.37-4.33-10.45-4.33c-4.08,0-7.78,1.65-10.45,4.33c-2.67,2.67-4.33,6.37-4.33,10.45c0,4.08,1.65,7.78,4.33,10.45 c2.67,2.67,6.37,4.33,10.45,4.33c4.08,0,7.78-1.65,10.45-4.33c2.67-2.67,4.33-6.37,4.33-10.45C76.22,28.45,74.56,24.75,71.89,22.08 L71.89,22.08z M14.89,25.63c-2.32,2.11-4.56,4.39-6.7,6.82c4.07,4.72,8.6,8.8,13.45,12.23c12.54,8.85,27.21,13.35,41.69,13.29 c14.42-0.07,28.65-4.67,40.37-14.02c4-3.19,7.7-6.94,11.03-11.25c-2.79-2.91-5.63-5.54-8.51-7.92C91.33,12.51,75,6.79,59.15,7.1 C43.34,7.42,27.93,13.76,14.89,25.63L14.89,25.63z' />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <button
              type='submit'
              className='w-full p-3 bg-[var(--color-fuchsia)] text-white rounded hover:bg-[var(--color-fuchsia-hover)]'>
              Se connecter
            </button>
            <button
              type='button'
              className='w-full p-3 bg-white text-[var(--color-fuchsia)] border border-[var(--color-fuchsia)] rounded hover:bg-gray-100 flex items-center justify-center gap-2'>
              <GoogleIcon className='h-5 w-5' /> Se connecter avec Google
            </button>
          </form>
          <p className='text-center mt-4 text-sm text-gray-700'>
            Pas encore inscrit ?{" "}
            <a
              href='/inscription'
              className='text-[var(--color-fuchsia)] underline'>
              S'inscrire
            </a>
          </p>
        </div>
      </div>

      {/* Section droite */}
      <div className='w-1/2 flex justify-center items-center'>
        <div className='w-4/5 flex flex-col items-center'>
          <h1 className='text-6xl font-light text-[var(--color-fuchsia)] text-left'>
            Toutes vos plateformes de
            <br />
            streaming au
            <br /> même endroit
          </h1>
        </div>
      </div>
    </div>
  );
}
