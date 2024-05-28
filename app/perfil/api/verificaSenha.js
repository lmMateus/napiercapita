'use server'
import { hash } from "bcrypt";
import bcrypt from 'bcrypt'
import { randomInt } from "crypto";

export const checkPass = async (last_p, p) =>{
  return bcrypt.compareSync(last_p, p); 
}