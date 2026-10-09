import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const pathNameMap: Record<string, string> = {
  orders: 'Đơn hàng',
  products: 'Sản phẩm',
  categories: 'Danh mục',
  customers: 'Khách hàng',
  analytics: 'Thống kê',
  roles: 'Phân quyền',
  settings: 'Cài đặt',
  profile: 'Cá nhân',
  create: 'Tạo mới',
  edit: 'Chỉnh sửa',
};

export const BreadCrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant mb-4">
        <FiHome className="w-3.5 h-3.5" />
        <span>Trang chủ</span>
        <FiChevronRight className="w-3 h-3 text-outline" />
        <span className="text-on-surface font-bold">Tổng quan</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-on-surface-variant mb-4">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <FiHome className="w-3.5 h-3.5" />
        <span>Trang chủ</span>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = pathNameMap[value.toLowerCase()] || value;

        return (
          <React.Fragment key={to}>
            <FiChevronRight className="w-3 h-3 text-outline" />
            {isLast ? (
              <span className="font-bold text-on-surface capitalize">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-primary transition-colors capitalize"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BreadCrumb;
