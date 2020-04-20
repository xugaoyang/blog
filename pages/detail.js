import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detail.css'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import servicePath from '../config/apiUrl'



const Detail = (detail) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartList: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(detail.article_content)
  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>{detail.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detail-title">我是标题</div>
              <div className="list-icon center">
                <span><Icon type="calendar" />2020-01-31</span>
                <span><Icon type="folder" />视频教程</span>
                <span><Icon type="fire" />9999人</span>
              </div>
              <div className="detail-content"
                dangerouslySetInnerHTML={{__html: html}}>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detail-nav comm-box">
              <div className="nav-title">
                文章目录
              </div>
              <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              />
            </div>
          </Affix>
          
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Detail.getInitialProps = async(context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then((res) => {
      resolve(res.data.data[0])
    })
  })
  return await promise
}

export default Detail
