import PropTypes from 'prop-types'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const Header = ({ label }) => {
  return <span>{ReactHtmlParser(label)}</span>
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
