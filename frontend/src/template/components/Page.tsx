import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
    children: ReactNode;
    meta?: ReactNode;
    title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
    ({ children, title = '', meta, ...other }, ref) => (
        <>
            <Helmet>
                <title>{`${title}`}</title>
                {meta}
            </Helmet>

            <Box ref={ref} {...other} mx={'auto'} >
                {children}
            </Box>
        </>
    )
);

export default Page;
