import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Bienvenido To Ecommerce pro',
  keywords: 'electronica,  comprar eletrónica y eletrónica barata',
  description:
    'Es un sitio web para realizar comercio electrónico desarrollado con las ultimas tecnologias',
}

export default Meta
