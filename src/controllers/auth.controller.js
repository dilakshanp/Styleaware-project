import { authService } from '../services/auth.service.js';
import { success } from '../utils/apiResponse.js';

export const register = async (req, res) => {
  success(res, await authService.register(req.body), 'Registered', 201);
};

export const login = async (req, res) => {
  success(res, await authService.login(req.body.email, req.body.password), 'Logged in');
};

export const me = async (req, res) => {
  success(res, req.user);
};
