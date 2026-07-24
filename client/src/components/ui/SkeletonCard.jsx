export default function SkeletonCard() {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                animate-pulse
            "
        >

            <div
                className="
                    w-16
                    h-16
                    rounded-full
                    bg-slate-200
                    mx-auto
                "
            />

            <div
                className="
                    h-5
                    w-28
                    bg-slate-200
                    rounded
                    mx-auto
                    mt-6
                "
            />

            <div
                className="
                    h-12
                    w-20
                    bg-slate-200
                    rounded
                    mx-auto
                    mt-5
                "
            />

            <div
                className="
                    h-4
                    w-36
                    bg-slate-200
                    rounded
                    mx-auto
                    mt-5
                "
            />

        </div>

    );

}