
import { SHighLight } from "./styles";

export function HighLight({ href, title }: { href: string, title: string}){
    return(
        <SHighLight>
  <section>
    <a href={href}>
      <h3>{title}</h3>
      <img src="src\assets\Gemini_Generated_Image_yxuo70yxuo70yxuo.png" alt={title}/>
    </a>
  </section>
   </SHighLight>
);
}
