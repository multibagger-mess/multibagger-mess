export default function DetailsLayout({

    children,

}) {

    return (

        <main className="relative min-h-screen bg-slate-50">

            {/* Background */}

            <div

                className="

                    absolute

                    inset-0

                    pointer-events-none

                    overflow-hidden

                "

            >

                <div

                    className="

                        absolute

                        top-0

                        right-0

                        h-96

                        w-96

                        rounded-full

                        bg-blue-100/30

                        blur-3xl

                    "

                />

                <div

                    className="

                        absolute

                        bottom-0

                        left-0

                        h-96

                        w-96

                        rounded-full

                        bg-indigo-100/30

                        blur-3xl

                    "

                />

            </div>

            <div

                className="

                    relative

                    max-w-7xl

                    mx-auto

                    px-6

                    py-14

                "

            >

                {children}

            </div>

        </main>

    );

}