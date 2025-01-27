const Footer = () => {
    return (
        <footer className='border-t mx-auto'>
            <div className='container flex items-center justify-center mx-auto gap-4 h-24'>
                <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
                    Built by{" "}
                    <a
                        href='https://www.linkedin.com/in/samius-sazin/'
                        target='_blank'
                        rel='noreferrer'
                        className='font-medium underline underline-offset-4'
                    > Samius Sazin </a>
                    . The source code is available on{" "}
                    <a
                        href='https://github.com/Samius-Sazin/sazShop'
                        target='_blank'
                        rel='noreferrer'
                        className='font-medium underline underline-offset-4'
                    > GitHub </a>
                    .
                </p>
            </div>
        </footer>
    );
};
export default Footer;