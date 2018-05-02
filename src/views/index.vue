<style scoped>
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
.ivu-menu-horizontal.ivu-menu-light:after {
    display: none;
}
.ivu-layout-header {
    background-color: #fff;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 30px;
    height: 30px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    font-size: 0;
}
.layout-logo-img {
    width: 30px;
    height: 30px;
}
.layout-service{
    float: right;
    height: 60px;
    line-height: 60px;
}
.layout-service-item {
    float: left;
    margin-right: 20px;
}
.layout-service-search{
    margin-top: 15px;
}
.layout-nav{
    float: left;
    margin-left: 60px;
}
.layout-footer-center{
    text-align: center;
}
.carousel-img{
    width: 100%;
    height: 100%;
}
.hot-goods-recommend h1 {
    margin: 30px 0;
}
.card-hot-item {
    display: inline-block;
    text-align: center;
    width: 245px;
    margin: 3px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light" active-name="0">
                    <div class="layout-logo">
                        <img class="layout-logo-img" src="../static/image/logo.png" alt="logo">
                    </div>
                    <div class="layout-nav clearfix">
                        <MenuItem name="0">全部商品</MenuItem>
                        <MenuItem name="1">手机通讯</MenuItem>
                        <MenuItem name="2">手机配件</MenuItem>
                        <MenuItem name="3">摄影摄像</MenuItem>
                        <MenuItem name="4">数码配件</MenuItem>
                        <MenuItem name="5">影音娱乐</MenuItem>
                        <MenuItem name="6">智能设备</MenuItem>
                    </div>
                    <div class="layout-service">
                        <div class="layout-service-item">
                            <Input v-model="searchValue" class="layout-service-search">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </div>
                        <Dropdown class="layout-service-item">
                            <Avatar icon="person"/>
                            <DropdownMenu slot="list">
                                <DropdownItem>立即登录</DropdownItem>
                                <DropdownItem>立即注册</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown class="layout-service-item">
                            <Badge count="4">
                                <icon type="ios-cart-outline" size="28"></icon>
                            </Badge>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Carousel 
                    autoplay
                    v-model="carouselIndex"
                    loop
                    :height="500"
                    :autoplay-speed="4000">
                    <CarouselItem>
                        <div class="carousel">
                            <img class="carousel-img" src="../static/image/carousel1.jpg" alt="1">
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="carousel">
                            <img class="carousel-img" src="../static/image/carousel2.jpg" alt="2">
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="carousel">
                            <img class="carousel-img" src="../static/image/carousel3.jpg" alt="3">
                        </div>
                    </CarouselItem>
                </Carousel>
                <div class="hot-goods-recommend">
                    <h1>热品推荐</h1>
                    <Card class="card-hot-item" v-for="key in hotGoods">
                        <img src="https://openfile.meizu.com/group1/M00/03/15/Cgbj0VpqqPyAX6GzAAw27mVWra0873_180x180.png">
                        <h3>魅蓝S6</h3>
                        <p>青年良品</p>
                        <p style="color: rgb(237, 63, 20);">￥999</p>
                    </Card>
                </div>
            </Content>
            <Footer class="layout-footer-center">2018 &copy; TigerMall</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchValue: '',
                carouselIndex: 0,
                hotGoods: [1, 2, 3, 4, 5]
            }
        }
    }
</script>