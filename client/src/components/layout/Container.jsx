export default function Container({
    children,
    className = "",
}) {
    return (
        <div
            className={`
                w-full
                mx-auto
                max-w-screen-2xl
                px-5
                sm:px-6
                md:px-8
                lg:px-10
                xl:px-14
                2xl:px-20
                ${className}
            `}
        >
            {children}
        </div>
    );
}