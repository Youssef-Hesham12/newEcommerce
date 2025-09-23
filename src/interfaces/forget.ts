
export interface ForgetPasswordForm {
  email: string;
}

export interface VerifyCodeForm {
  resetCode: string; 
}

export interface ResetPasswordForm {
  newPassword: string;
}

export interface ForgetPasswordResponse {
  statusMsg: string;
  message: string;   
}


export interface VerifyCodeResponse {
  status: string; 
}


export interface ResetPasswordResponse {
  message: string;  
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}
