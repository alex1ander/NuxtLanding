<template>
    <header>
        <div class="header-container">
            <div class="two-part-content">
                <div class="content content-header desktop">
                    <div class="content-header-part">
                        <div class="place-for-logo">
                            <LogoText />                
                        </div>
                        <MenuList />
                    </div>


                    <div class="content-header-part">   
                        <LanguageDropdown />
                        <ContactsDropDown />
                    </div>
                </div>
                <div class="content content-header mobile">
                    <div class="content-header-part">
                        <LogoText />
                    </div>

                    <div class="content-header-part">
                        <LanguageDropdown />
                        <BurgerMenu />                        
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>


<script setup>
// Импорт компонента LogoText
import LogoText from './LogoText.vue'
</script>

<script>
import BurgerMenu from './BurgerMenu.vue'
import LanguageDropdown from './LanguageDropdown.vue';
import ContactsDropDown from './ContactsDropDown.vue';
import MenuList from './MenuList.vue';
export default {
    name: 'App',
    components: {
        BurgerMenu,
        LanguageDropdown,
        ContactsDropDown
    },
}
</script>





<style scoped lang="scss">
@use 'sass:math';
@use '../assets/scss/variables' as *;

$header-height:68;

.top-bar{

    &.desktop{
        height: 46px;
    }
    &.mobile{
        padding: 18px 0px;

        .top-bar-text{
            font-size: 16px;
            line-height: 1.5em;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
        }
    }

    background: #C3B4F2;
    display: flex;
    align-content: center;
    justify-content: center;

    .top-bar-text{
        display: flex;
        align-items: center;
        font-size:14px;

        span{
            border-radius: 20px;
            color: var(--prime-color);
            background: var(--second-color);
            font-weight: 700;
            padding: 5px 14px;
            margin: 0 8px;
        }
    }
}

.main-logo{
    height: 48px;
    width: 48px;
}
header{
    position: sticky;
    z-index: 1000;
    top: 0px;
    padding: 14px 20px;
    background: none;
}
.header-container{
    margin: auto;
    width: 100%;
    text-wrap:nowrap;
    display: flex;
    align-items: center;
    height:  #{$header-height}px;
    border-radius: 20px;
    background: linear-gradient(45deg, rgba(62, 176, 212, 0.6) 0%, rgba(150, 99, 200, 0.6) 100%) !important;
    position: relative;
    &::after{
        content: '';
        height: 100%;
        width: 100%;
        border-radius: 30px;
        position: absolute;
        backdrop-filter: blur(6px) saturate(150%);
        -webkit-backdrop-filter: blur(6px) saturate(150%);
        z-index: -1;
        
    }

    .container{
        background: var(--prime-color);
        display: flex;
        position: relative;
        height: 100%;
    }



    .content-header{

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .content-header-part{
            height: 100%;
            display: flex;
            gap:20px;
            align-items: center;

            .place-for-logo{
                margin: 0 50px;
            }
        }
    }

    .text-with-svg{
        font-weight: 600;
    }

    $content-padding: 10px;
    .content {
        padding-left: $content-padding;
        padding-right: $content-padding;
    }
}



@media (max-width: 1024px) {

    .header-container {
        // border-radius: 30px;
    }
}

</style>