import React from 'react'

export const GumletEmbedPlayer = ({ 
  videoID,
  title="Gumlet video player",
  style={padding:"56.25% 0 0 0", position:"relative"},
  schemaOrgVideoObject={},
  ...props
}) => {
  if(!videoID) return <div>Error: videoID is required</div>

  let srcURL = new URL(`https://play.gumlet.io/embed/${videoID}`);
  
  for (const [key, value] of Object.entries(props)) {
    srcURL.searchParams.append(key, value);
  }

  return (
    <div style={style}>
      {
        JSON.stringify(schemaOrgVideoObject) !== '{}' ? <script type='application/ld+json' dangerouslySetInnerHTML={ { __html: `${JSON.stringify(schemaOrgVideoObject)}`}} /> : null
      }
      
      <iframe 
        loading="lazy" 
        title={title}
        src={srcURL.toString()}
        style={{border:"none", position: "absolute", "top":0, "left":0, "height": "100%", "width": "100%"}}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
        allowFullScreen>
      </iframe>
    </div>
  )
}
