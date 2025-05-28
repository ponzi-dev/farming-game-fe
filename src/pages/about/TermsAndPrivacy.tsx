import React from 'react';

const TermsAndPrivacy = () => {
  return (
    <div className="px-5 mx-auto py-8 text-gray-800">
      <h1 className="text-[25px] font-bold mb-6 text-center">Điều khoản & Chính sách</h1>

      <section className="mb-8">
        <h2 className="text-[20px] font-semibold mb-2 text-blue-700">📜 Điều khoản Dịch vụ</h2>
        <p className="leading-relaxed">
          Khi tham gia sử dụng nền tảng <strong>Farming Game</strong>, bạn đồng ý tuân thủ các
          quy định về tài khoản, hoạt động trong game và quy trình nhận thưởng. Người dùng cam kết
          không sử dụng gian lận, không gây ảnh hưởng đến trải nghiệm của người chơi khác và chịu trách
          nhiệm với mọi hành vi trên tài khoản cá nhân.
        </p>
      </section>

      <section>
        <h2 className="text-[20px] font-semibold mb-2 text-green-700">🔐 Chính sách Bảo mật</h2>
        <p className="leading-relaxed">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Dữ liệu như email, số điện thoại và lịch
          sử giao dịch được lưu trữ bảo mật và chỉ sử dụng nhằm mục đích hỗ trợ dịch vụ, cải thiện trải
          nghiệm người dùng, hoặc theo yêu cầu của pháp luật. Nền tảng tuyệt đối không chia sẻ thông tin
          với bên thứ ba khi không có sự đồng ý của người dùng.
        </p>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
