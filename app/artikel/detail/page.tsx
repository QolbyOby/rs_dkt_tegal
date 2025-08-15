import gambar from "@/public/img/hero_section2.png"
import Image from "next/image"

export default function DetailArtikel() {
    return (
        <div className="flex flex-col items-center relative">
            <Image src={gambar} alt="gambar" className="w-[750px] absolute rounded-xl  -top-20 border-8" />

            <div className="px-96  pt-[450px]">
                <h1 className="text-4xl font-bold mb-5">Artikel 1</h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, eius in minima quae exercitationem illum corrupti optio dolorem mollitia perferendis animi consectetur consequuntur ea sapiente praesentium expedita voluptatibus placeat cupiditate.
                </p>
            </div>
        </div>
    )
}