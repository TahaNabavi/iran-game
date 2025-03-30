import { WEBSITE_DIR } from "conf";

export default function DIR(rtl:string,ltr:string,className:string){
    return `${className} ${WEBSITE_DIR === "rtl" ? rtl : ltr}` ;
}