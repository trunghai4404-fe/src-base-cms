import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { toggleSidebar } from '@/stores/slices/UiSlice.reducer';
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';
import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiFolder,
  FiUsers,
  FiShield,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiPieChart,
} from 'react-icons/fi';

const { Sider } = Layout;

const menuItems: ItemType<MenuItemType>[] = [
  { key: '/', label: 'Tổng quan', icon: <FiGrid className="w-4 h-4" /> },
  { key: '/orders', label: 'Quản lý đơn hàng', icon: <FiShoppingBag className="w-4 h-4" /> },
  { key: '/products', label: 'Quản lý sản phẩm', icon: <FiBox className="w-4 h-4" /> },
  { key: '/categories', label: 'Danh mục sản phẩm', icon: <FiFolder className="w-4 h-4" /> },
  { key: '/customers', label: 'Quản lý khách hàng', icon: <FiUsers className="w-4 h-4" /> },
  { key: '/analytics', label: 'Thống kê & Báo cáo', icon: <FiPieChart className="w-4 h-4" /> },
  { key: '/roles', label: 'Phân quyền & Vai trò', icon: <FiShield className="w-4 h-4" /> },
  { key: '/settings', label: 'Cài đặt hệ thống', icon: <FiSettings className="w-4 h-4" /> },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      width={256}
      collapsedWidth={80}
      className="bg-surface-container-low! border-r border-outline-variant/40 h-screen select-none font-sans"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center h-16 px-4 border-b border-outline-variant/40 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-on-primary font-bold text-lg shadow-xs shrink-0">
                🥖
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col whitespace-nowrap">
                  <span className="font-bold text-base text-on-surface leading-tight">
                    Bakery CMS
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Hệ thống quản lý
                  </span>
                </div>
              )}
            </div>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            className="border-none! bg-transparent! py-3! font-medium text-sm text-on-surface-variant"
          />
        </div>

        <div className="p-3 border-t border-outline-variant/40 bg-surface-container-low">
          <Button
            type="text"
            block
            onClick={() => dispatch(toggleSidebar())}
            className={`flex! items-center h-10! px-3! rounded-md! text-on-surface-variant hover:!bg-surface-container-high! hover:!text-on-surface! transition-colors justify-center!'
              }`}
            title={sidebarCollapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-surface-container hover:bg-primary-container transition-colors">
              {sidebarCollapsed ? (
                <FiChevronRight className="w-4 h-4 text-on-surface" />
              ) : (
                <FiChevronLeft className="w-4 h-4 text-on-surface" />
              )}
            </div>
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
