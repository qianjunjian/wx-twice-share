# 微信二次分享
    解决微信二次分享后，标题，摘要，图标不正确的问题
    
# 使用前提
    先把分享页的地址传给后台换取签名，然后再调用这个工具

## 微信，qq，qq空间
    import share from "wx-twice-share"
    share({
        debug: false
        appId: "***",  // 后台返回之前获取的appId
        timestamp: "***", // 必填，后台接口生成签名的时间戳
        nonceStr: "***", // 必填，后台接口生成签名的随机串
        signature: "***", // 必填, 后台接口生成的签名

        // 分享信息
        shareData: {
             // 分享标题
            title:  "***",
            // 分享描述
            desc:  "***",
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link:  "***",
            // 分享图标
            imgUrl:  "***",
        }
    })

## 只需要微信分享
    import { wxshare } from "wx-twice-share"；
    share({
        debug: false
        appId: "***",  // 后台返回之前获取的appId
        timestamp: "***", // 必填，后台接口生成签名的时间戳
        nonceStr: "***", // 必填，后台接口生成签名的随机串
        signature: "***", // 必填, 后台接口生成的签名

        // 分享信息
        shareData: {
             // 分享标题
            title:  "***",
            // 分享描述
            desc:  "***",
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link:  "***",
            // 分享图标
            imgUrl:  "***",
        }
    })

## 只需要qq分享
    import { qqshare } from "wx-twice-share"；
    qqshare({
        // 分享信息
        shareData: {
             // 分享标题
            title:  "***",
            // 分享描述
            desc:  "***",
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link:  "***",
            // 分享图标
            imgUrl:  "***",
        }
    })

## 只需要qq空间分享
    import { qzshare } from "wx-twice-share"；
    qzshare({
        // 分享信息
        shareData: {
             // 分享标题
            title:  "***",
            // 分享描述
            desc:  "***",
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link:  "***",
            // 分享图标
            imgUrl:  "***",
        }
    })