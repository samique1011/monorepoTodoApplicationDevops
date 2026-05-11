import zod from "zod"

export const userSchema = zod.object({
    username : zod.string().min(2) ,
    password : zod.string().min(4)
})

export const todoSchema = zod.object({
    title : zod.string().min(2) ,
    description : zod.string().min(2)
})
