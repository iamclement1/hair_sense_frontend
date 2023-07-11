import { Layout, ScreenSize } from '@/components/layouts'
import { Flex, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
   return (
      <Layout title="Hair Sense">
         <ScreenSize>
            <Center>
               <Flex direction="column" align="center" p={4} m={4}>
                  <Text fontSize="8rem" as="b">404</Text>
                  <Text fontSize="xl" p={2}>Sorry, we were unable to find that page</Text>
                  <Text fontSize="md" >Start from <Link href={'/'} > <span>home page</span> </Link></Text>
               </Flex>
            </Center>
         </ScreenSize>
      </Layout>
   )
}

export default PageNotFound
