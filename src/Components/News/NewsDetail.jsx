import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

NewsDetail.propTypes = {

};

function NewsDetail(props) {
    const { postId } = useParams();
    const [post, setPost] = useState();
    useEffect(() => {
        async function FetchData() {
            const requestUrl = `https://jsonplaceholder.typicode.com/posts?id=${postId}`;
            const response = await fetch(requestUrl);
            const data = await response.json();
            setPost(data);
        }
        FetchData();
    }, [])


    return (
        <div className="main">
            <div className="container">
                <div className="title-link-wapper">
                    <a href className="title-link">
                        <div className="title-link-text"> Tin tức</div>
                        <div className="title-link-icon">&gt;</div>
                    </a>
                    <a href className="title-link">
                        <div className="title-link-text">Cách giữ áo trắng không bị ố vàng nhanh hiệu quả nhất</div>
                    </a>
                </div>
            </div>
            <div className="container">
                {post && post.map(post => (
                    <div className="news-detail" key={post.id}>
                        <div className="news-detail-title">
                            {post.title}
                        </div>
                        <div className="news-detail-time">
                            20/02/2020, 16:58
      </div>
                        <div className="news-detail-body">
                            <p>
                                {post.body}
                                <br />
                                <br />
          1. Nguyên liệu từ chanh tươi
          <br />
                                <br />
          1.1 Chanh và bột giặt không hóa chất
          <br />
                                <br />
          Chanh và bột giặt không hóa chất
          <br />
                                <br />
          Cách 1: Cắt lát 2 quả chanh tươi, cho vào chiếc nồi to và đun sôi, tắt lửa thả quần áo cần tẩy trắng vào ngâm khoảng 1 tiếng sau đó giặt sạch như bình thường.
          Cách 2: Ngoài ra để làm sạch những vết bẩn khác, chị em có thể hòa khoảng nửa ly nước cốt chanh tươi cùng với bột giặt và ngâm quần áo khoảng 10-15
          phút, sau đó xả lại với nước sạch. Cách tầy trắng quần áo từ tinh chất từ chanh không những giúp tẩy trắng mà còn khử mùi quần áo rất hiệu quả.
          Cách 3: Cho nửa chén nước cốt chanh với 2 muỗng bột giặt và hòa với nước nóng. Bôi dung dịch lên trên vết bẩn và giữ nguyên vòng ít nhất 30 phút rồi giặt
          sạch.
          Hiện nay trên thị trường đã có rất nhiều hãng bán bột giặt không chứa hóa chất độc hại như của Seventh Generation, Sun and Earth, Planet by Ultra, Biokleen…
          Nếu bạn không thích sử dụng bột giặt, thì quả bồ hòn là một phương án thay thế hoàn hảo mà lại hoàn toàn từ thiên nhiên.
          <br />
                                <br />
          1.2 Chanh và giấm ăn
          <br />
                                <br />
          Giặt quần áo với xà phòng như thông thường, xả nước nhiều lần cho sạch hẳn xà phòng sau đó vắt thật khô, cho nước cốt chanh vào những vết bẩn và chà xát
          nhiều lần. Tiếp thep cho quần áo trắng vào ngâm trong thau nước ấm đã hòa sẵn một bát giấm trong 3-4h sau đó xả lại với nước hoặc giặt lại với bột giặt rồi xả
          với nước xả cho thơm quần áo.
          Với cách này không những giúp quần áo trắng của bạn trở nên trắng sáng mà còn mềm mại hơn nhiều ấy.
        </p>
                            <div className="news-detail-body__wapper text-center">
                                <img src="/img/85858434-6766-43E4-8A56-25950F8BC522.png" alt="" className="news-detail-body__img" />
                            </div>
                            <p>
                                Chanh và giấm ăn
          <br />
                                <br />
          1.3 Chanh và thuốc tím
          <br />
                                <br />
          Hòa tan thuốc tím với ít nước, sau đó cho quần áo vào ngâm một lúc sẽ bị ngấm màu tím, các vết ố bẩn sẽ chuyển thành màu nâu loang lổ. Vắt ráo thuốc tím
          sau đó lấy vài quả chanh vắt nước rồi ngâm áo vào. Nước chanh sẽ khử màu thuốc tím sạch sẽ và quần áo sẽ trở nên trắng sáng.
          <br />
                                <br />
          Chanh và thuốc tím
          1.4 Chanh và baking soda
          <br />
                                <br />
          Rắc 1 muỗng canh bột baking soda trực tiếp lên vết bẩn. Dùng một nửa trái chanh chà nhẹ nhàng lên vết bẩn. Để hỗn hợp trên áo khoảng 15 phút, sau đó giặt
          xả lại bình thường với nước ấm.
          Cách tầy trắng quần áo này cũng được sử dụng để loại bỏ vết áo vàng trên nách áo. Ngoài ra, bạn cũng có thể trộn 1 muỗng canh baking soda với nước cốt
          chanh để tạo thành hỗn hợp nhão, dùng bàn chải đánh chà hỗn hợp lên chỗ bị bẩn, sau đó xả sạch lại bằng nước.
          <br />
                                <br />
          Chanh và baking soda
          2. Nguyên liệu từ giấm ăn
        </p>
                            <div className="news-detail-body__wapper text-center">
                                <img src="/img/A38C5D99-5B12-4E3B-BA9E-4C5F1BB70826.png" alt="" className="news-detail-body__img" />
                            </div>
                            <p>
                                Cách 1: Một cách tẩy trắng quần áo khác đó là sử dụng giấm ăn. Giấm ăn có tác dụng làm trắng, khử mùi và làm mềm vải. Hòa lẫn 1 cốc giấm ăn với bột giặt,
                                nếu vết bẩn quá cứng đầu như ở cổ áo, nách áo, cổ tay áo… các bạn có thể đổ trực tiếp giấm ăn lên đó, dùng tay chà nhẹ nhàng và xả lại bằng nước trước khi
                                giặt. Mùi giấm sẽ bay hết khi quần áo khô.
                                Cách 2: Hòa tan 1 lít nước ấm với 1/2 chén giấm trắng, sau đó cho quần áo vào ngâm trong 40 phút rồi giặt xả lại bình thường.
                                Nguyên liệu từ giấm ăn
                                Giấm trắng không những có công dụng loại bỏ vết bẩn mà còn giữ quần áo luôn mềm và không bị khô cứng trong quá trình sử dụng.
          <br />
                                <br />
          3. Nguyên liệu từ Baking Soda
        </p>
                            <div className="news-detail-body__wapper text-center">
                                <img src="/img/8E55CAF3-1695-4FAA-A778-1B469447E2E9.png" alt="" className="news-detail-body__img" />
                            </div>
                            <p>
                                Baking soda là chất bột mịn được gọi là thuốc muối hay thuốc tiêu mặn, có bán sẵn ở các hiệu thuốc hoặc cửa hàng làm bánh. Không chỉ được dùng trong
                                việc làm đẹp như tẩy da chết, khử mùi, làm trắng, baking soda còn là cách tẩy trắng quần áo giúp bạn xử lý những vết ố vàng đáng ghét.
          <br />
                                <br />
          Cách 1: Trộn đều 4 thìa bột baking soda trong 1/4 bát nước. Sau đó lấy bàn chải đánh răng quết hỗn hợp này lên vị trí bị ố vàng trên áo, để yên trong vòng 1
          tiếng rồi đem giặt lại bằng bột giặt. Nếu vết ố vàng chưa sạch, bạn lại tiếp tục quết hỗn hợp baking soda lên vết ố để đạt hiệu quả như ý. Lưu ý với cách tẩy
          trắng quần áo bị ố vàng này bạn nên giặt tay thay vì giặt máy để quần áo được bền màu như mới.
          Chanh và baking soda
          Cách 2: Hòa hai muỗng cà phê bột baking soda với nước, ngâm quần áo vào từ 10-15 phút, sau đó giặt lại với nước như bình thường, làm lại quy trình lần 2
          trước khi đem phơi. Chỉ cần chà xát nhẹ, vừa đủ làm sạch vết bẩn mà không gây tổn thương cho bề mặt vải.
          bột baking soda
        </p>
                        </div>
                    </div>

                ))}


            </div>
            <div className="container">
                <div className="news-detail-same">
                    <div className="news-detail-same__title">
                        Bài viết liên quan
        </div>
                    <div className="new-detail-same__wapper">
                        <div className="news-body">
                            <div className="news-item">
                                <a href className="news-item-left">
                                    <img src="/img/A47B83F3-F679-418F-8E3E-B543D954A082.png" alt="" className="news-item-left__img" />
                                </a>
                                <div className="news-item-body">
                                    <a href className="news-item-body__title">
                                        Cách giữ áo trắng không bị ố vàng nhanh hiệu quả nhất
                </a>
                                    <a href className="news-item-body__tags">
                                        Tags: Áo thun - Sơ mi
                </a>
                                    <div className="news-item-body__time">
                                        20/02/2020, 16:58
                </div>
                                </div>
                            </div>
                            <div className="news-item">
                                <a href className="news-item-left">
                                    <img src="/img/6038C68E-8E22-4BE1-AD13-F59A54F38E4D.png" alt="" className="news-item-left__img" />
                                </a>
                                <div className="news-item-body">
                                    <a href className="news-item-body__title">
                                        Cách “bảo dưỡng” quần áo luôn như mới
                </a>
                                    <a href className="news-item-body__tags">
                                        Tags: Áo thun - Sơ mi
                </a>
                                    <div className="news-item-body__time">
                                        20/02/2020, 16:58
                </div>
                                </div>
                            </div>
                            <div className="news-item">
                                <a href className="news-item-left">
                                    <img src="/img/A47B83F3-F679-418F-8E3E-B543D954A082.png" alt="" className="news-item-left__img" />
                                </a>
                                <div className="news-item-body">
                                    <a href className="news-item-body__title">
                                        Cách giữ áo trắng không bị ố vàng nhanh hiệu quả nhất
                </a>
                                    <a href className="news-item-body__tags">
                                        Tags: Áo thun - Sơ mi
                </a>
                                    <div className="news-item-body__time">
                                        20/02/2020, 16:58
                </div>
                                </div>
                            </div>
                            <div className="news-item">
                                <a href className="news-item-left">
                                    <img src="/img/6038C68E-8E22-4BE1-AD13-F59A54F38E4D.png" alt="" className="news-item-left__img" />
                                </a>
                                <div className="news-item-body">
                                    <a href className="news-item-body__title">
                                        Cách “bảo dưỡng” quần áo luôn như mới
                </a>
                                    <a href className="news-item-body__tags">
                                        Tags: Áo thun - Sơ mi
                </a>
                                    <div className="news-item-body__time">
                                        20/02/2020, 16:58
                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="col-12 product-highlight__button-list">
                        <li className="product-highlight__button-item ">
                            <a href className="product-highlight__button-link">
                                &lt;
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link product-highlight__button-item-active">
                                1
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                2
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                3
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                4
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                5
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                6
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                ...
            </a>
                        </li>
                        <li className="product-highlight__button-item">
                            <a href className="product-highlight__button-link">
                                &gt;
            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default NewsDetail;