async function loadBlogs() {

    const container =
        document.getElementById("blog-list");


    try {

        const response =
            await fetch("./blogs.md");


        if (!response.ok) {

            throw new Error(
                `blogs.md returned ${response.status}`
            );

        }


        const markdown =
            await response.text();


        const posts =
            parseBlogs(markdown);


        if (posts.length === 0) {

            container.innerHTML = `
                <div class="loading">
                    no blogs found...
                </div>
            `;

            return;
        }


        container.innerHTML = "";


        posts.forEach((post, index) => {

            const article =
                document.createElement("article");


            article.className =
                "blog-post";


            article.style.setProperty(
                "--rotation",
                index % 2 === 0
                    ? "0.4deg"
                    : "-0.7deg"
            );


            const title =
                document.createElement("h3");

            title.textContent =
                post.title;


            const description =
                document.createElement("p");

            description.textContent =
                post.description;


            const link =
                document.createElement("a");

            link.className =
                "blog-link";


            link.href =
                post.link;


            link.textContent =
                "READ BLOG →";


            if (
                post.link.startsWith("http://") ||
                post.link.startsWith("https://")
            ) {

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";
            }


            article.appendChild(title);

            article.appendChild(description);

            article.appendChild(link);


            container.appendChild(article);

        });


    } catch (error) {

        console.error(
            "BLOG ERROR:",
            error
        );


        container.innerHTML = `
            <div class="loading">
                couldn't load blogs.md :(
                <br><br>
                ${error.message}
            </div>
        `;
    }
}



function parseBlogs(markdown) {

    const lines =
        markdown
            .split(/\r?\n/)
            .map(line => line.trim());


    const posts = [];

    let current = null;

    let hasLink = false;


    for (const line of lines) {


        /* =========================
           # Blog title
        ========================== */

        if (line.startsWith("# ")) {

            if (current) {

                posts.push(current);

            }


            current = {

                title:
                    line
                        .substring(2)
                        .trim(),

                link:
                    "#",

                description:
                    ""
            };


            hasLink = false;

            continue;
        }


        if (!current || !line) {

            continue;

        }


        /* =========================
           [https://example.com]
        ========================== */

        if (
            line.startsWith("[") &&
            line.endsWith("]")
        ) {

            current.link =
                line
                    .substring(
                        1,
                        line.length - 1
                    )
                    .trim();


            hasLink = true;

            continue;
        }


        /* =========================
           [text](https://...)
        ========================== */

        const markdownLink =
            line.match(
                /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/
            );


        if (markdownLink) {

            current.link =
                markdownLink[2];

            hasLink = true;

            continue;
        }


        /* =========================
           Plain URL
        ========================== */

        if (
            line.startsWith("https://") ||
            line.startsWith("http://")
        ) {

            current.link =
                line;

            hasLink = true;

            continue;
        }


        /* =========================
           Description
        ========================== */

        if (hasLink) {

            if (current.description) {

                current.description += " ";

            }


            current.description += line;
        }
    }


    if (current) {

        posts.push(current);

    }


    return posts;
}


loadBlogs();
