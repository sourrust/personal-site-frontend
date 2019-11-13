import React from 'react';
import Tags  from './Tags';

const baseUrl = '//splash.nyc3.cdn.digitaloceanspaces.com/personal-site/projects';

function Project({
    name, image, github, href, description, tags
}) {
    const imageUrl    = `${baseUrl}/${image.baseUrl}`;
    const smallImage  = `${imageUrl}-400.jpg`;
    const mediumImage = `${imageUrl}-800.jpg`;
    const fullImage   = `${imageUrl}.jpg`;

    return (
        <div className="project column">
            <div className="card">
                <div className="card-image">
                    <figure className="image">
                        <picture>
                            <source media="(max-width: 799px)" srcSet={ smallImage } />
                            <source media="(max-width: 1199px)" srcSet={ mediumImage } />
                            <img src={ fullImage } alt={ image.title } />
                        </picture>
                    </figure>
                </div>
                <div className="card-content">
                    <h4 className="title">{ name }</h4>
                    <p className="subtitle">
                        <a href={ href }>{ github }</a>
                    </p>
                    <p className="description">{ description }</p>
                    <Tags tags={ tags } />
                </div>
            </div>
        </div>
    );
}

export default Project;
