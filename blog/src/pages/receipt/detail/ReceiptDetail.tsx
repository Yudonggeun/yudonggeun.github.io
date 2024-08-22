import {useReceiptStore} from "../../../store/ReceiptStore";
import {useEffect, useState} from "react";
import {requestReceiptDetail, requestRefund} from "../../../api/receipt/api";
import {ReceiptDetailItem} from "../../../api/receipt/type";
import {getPriceFormatted} from "../../../util/NumberUtil";
import {getKrDateFormat} from "../../../util/DateUtil";
import {usePageStore} from "../../../store/PageStore";

function ReceiptDetailPage() {

    const {receiptId, setReceiptId} = useReceiptStore();
    const {currentPage, setPage} = usePageStore();
    const [receiptDetail, setReceiptDetail] = useState<ReceiptDetailItem | null>(null);

    useEffect(() => {
        requestReceiptDetail(
            receiptId!,
            (receipt) => {
                setReceiptDetail(receipt);
            },
            () => {
                console.log('Failed to fetch receipt.');
            }
        )
    }, [receiptId]);

    if (receiptDetail === null) {
        return (
            <div className="container mx-auto p-6">
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">거래 내역 상세 보기</h2>
                        <p>거래 내역을 불러오는 중입니다...</p>
                    </div>
                </div>
            </div>
        );
    }

    const onClickRefund = () => {
        requestRefund(
            receiptId!,
            () => {
                console.log('Refund success.');
                setPage('home');
            },
            () => {
                console.log('Refund failed.');
            }
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">거래 내역 상세 보기</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">영수증 ID</label>
                        <p className="text-lg font-semibold">{receiptDetail?.receiptId}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">상품명</label>
                        <p className="text-lg font-semibold">{receiptDetail?.productName}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">가격</label>
                        <p className="text-lg font-semibold">{getPriceFormatted(receiptDetail!.price)}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">수량</label>
                        <p className="text-lg font-semibold">{receiptDetail?.quantity}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">거래 상태</label>
                        <p className="text-lg font-semibold text-[#62CBC6]">{receiptDetail?.receiptStatus}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">경매 ID</label>
                        <p className="text-lg font-semibold">{receiptDetail?.auctionId}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">판매자 ID</label>
                        <p className="text-lg font-semibold">{receiptDetail?.sellerId}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">구매자 ID</label>
                        <p className="text-lg font-semibold">{receiptDetail?.buyerId}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">생성일</label>
                        <p className="text-lg font-semibold">{getKrDateFormat(new Date(receiptDetail!.createdAt))}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">수정일</label>
                        <p className="text-lg font-semibold">
                            {getKrDateFormat(new Date(receiptDetail!.updatedAt))}
                        </p>
                    </div>

                    {
                        receiptDetail?.receiptStatus === 'REFUND' ? ''
                            :
                            < div className="text-center mt-6">
                        <button
                        className="btn btn-primary bg-[#62CBC6] border-0 text-white"
                        onClick={onClickRefund}
                        >취소하기
                        </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ReceiptDetailPage;