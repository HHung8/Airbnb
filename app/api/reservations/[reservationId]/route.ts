import { NextResponse } from "next/server"; // Đây là đối tượng được sử dụng để tạo ra các phản hồi (response) từ server NextJS
import getCurrentUser from "@/app/actions/getCurrentUser"; // Có nhiệm vụ trả về thông tin của người dùng hiện tại
import prisma from "@/app/libs/prismadb"; // thư viện để thao tác với cơ sở dũ liệu ORM

// Là một interface mô tả cấu trúc của params
interface IParams {
  reservationId?: string;
}
// Hàm DELETE được định nghĩa nhận vào một đối tượng request và một đối tượng params theo kiểu { params: IParams }.
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // Gọi Hàm getCurrentUser để lấy thông tin người dùng hiện tại 
  const currentUser = await getCurrentUser();
  // Nếu không có người dùng nào được tìm thấy trả về lỗi HTTP
  if (!currentUser) {
    return NextResponse.error();
  }
  const { reservationId } = params; // Lấy giá trị của reservation từ đối tượng params 
  //Kiểm tra nếu reservationId không tồn tại và không phải kiểu string thì trả về lỗi Invalid không tồn tại 
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  } 

  // Sử dụng prisma để xoá một hoặc nhiều bản ghi reservation từ cơ sở dữ liệ 
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });
  //Trả về một phản hồi JSON chứa thông tin của reservation đã xóa từ cơ sở dữ liệu.
  return NextResponse.json(reservation);
}

