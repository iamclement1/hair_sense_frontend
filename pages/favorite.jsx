import FavouritePage from '@/My-pages/FavoritePage'
import { Layout, ScreenSize } from '@/components/layouts'


const Favorite = () => {
   return (
      <Layout title="Hair Sense Favortie page">
         <ScreenSize>
            <FavouritePage />
         </ScreenSize>
      </Layout>
   )
}

export default Favorite