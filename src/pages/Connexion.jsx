// src/pages/Login.jsx
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-3xl font-extrabold text-center text-green-900 mb-8">
          Se connecter à <span className="text-yellow-400">SunuLoi</span>
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemple@domaine.com"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a
              href="#"
              className="text-green-700 hover:text-yellow-400 hover:underline transition"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-800 hover:bg-green-900 text-white rounded-xl font-semibold shadow-md transition"
          >
            Connexion
          </button>
        </form>

        <p className="mt-6 text-center text-green-700">
          Pas encore de compte ?{" "}
          <a
            href="/register"
            className="font-semibold text-yellow-400 hover:text-yellow-500 underline transition"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
a