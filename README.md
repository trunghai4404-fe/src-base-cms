# CMS Web - React Base Project

Mã nguồn cơ sở (Src-Base) cho hệ thống **Web CMS / Admin Dashboard** được xây dựng trên nền tảng **React 19**, **TypeScript**, **Vite 6** và **TailwindCSS v4**. Dự án tuân thủ mô hình kiến trúc **Feature-Driven & Clean Architecture**, tích hợp sẵn phân quyền RBAC/PBAC và tầng HTTP Client chuẩn Enterprise.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Core:** React 19, TypeScript, Vite 6
* **UI Kit & Styling:** Ant Design (`antd`), TailwindCSS v4 (`@tailwindcss/vite`), `@ant-design/icons`, `react-icons`, CKEditor 5
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`), React Redux
* **Data Fetching & Cache:** TanStack React Query v5 (`@tanstack/react-query`), Axios (`axios`)
* **Routing:** React Router v7 (`react-router-dom`)
* **Token Management:** Cookies (`js-cookie`)

---

## 📁 Cấu Trúc Thư Mục `src/`

```text
src/
├── app/                    # Cấu hình cấp ứng dụng (Providers, Router)
│   ├── providers/          # AppProvider, ReduxProvider, QueryProvider
│   └── router/             # AppRouter, routes, ProtectedRoute guard
├── assets/                 # Hình ảnh, biểu tượng, phông chữ tĩnh
├── components/             # Reusable UI Components toàn ứng dụng
│   └── common/             # Component dùng chung (CanAccess,...)
├── config/                 # Hằng số cấu hình hệ thống (Cookies, AppConfig)
├── constants/              # Danh sách Hằng số (PERMISSIONS, AppInfo)
├── core/                   # Hạ tầng xử lý HTTP Client, Call API & Exception
│   ├── api-error.ts        # Custom ApiError class chuẩn hóa lỗi HTTP
│   ├── api-response.ts     # ApiResponse class & PaginatedResponse interface
│   ├── axios-client.ts     # Axios Instance với Request/Response Interceptors
│   ├── callApi.ts          # Hàm callApi dùng chung cho các Service (GET, POST, PUT, PATCH, DELETE)
│   ├── handleApi.ts        # Re-export callApi
│   └── query-client.ts     # Cấu hình TanStack Query Client
├── features/               # Các mô-đun nghiệp vụ (Dashboard, Products, Orders, Users,...)
├── hooks/                  # Custom React Hooks (usePermission,...)
├── layouts/                # Khung giao diện chung (MainLayout, AuthLayout, Sidebar, Header)
├── lib/                    # Các Helper Utilities, Cookie Manager, Permission Logic
├── routes/                 # Cấu hình định tuyến bổ sung
├── services/               # Tầng gọi API Services theo đối tượng nghiệp vụ
├── stores/                 # Quản lý State toàn cục bằng Redux Toolkit
│   ├── slices/             # Redux slices (authSlice, uiSlice)
│   ├── hooks.ts            # Typed Hooks (useAppDispatch, useAppSelector)
│   └── stores.ts           # Cấu hình Redux Store chính
├── types/                  # Shared TypeScript Interfaces / Types
├── App.css
├── index.css               # TailwindCSS entry
└── main.tsx                # Entry point ứng dụng
```

---

## ✨ Các Tính Năng Nổi Bật Của `src-base`

1. **Kiến trúc Modular & Scalable:**
   Dễ dàng mở rộng thêm tính năng mới mà không làm ảnh hưởng tới các mô-đun hiện có.

2. **Quản Lý State Phân Tách Rõ Ràng:**
   - **Client State (Redux Toolkit):** Quản lý thông tin đăng nhập (`auth`), trạng thái giao diện UI (`sidebarCollapsed`).
   - **Server State (TanStack React Query):** Quản lý dữ liệu fetch từ API, tự động caching, refetching và đồng bộ dữ liệu.

3. **Hạ Tầng Call API Tập Trung & Chuẩn Hóa:**
   - **`axiosClient`:** Tự động đính kèm `Bearer Token` vào Header, tự động xóa Session và bẫy lỗi 401/403/500 thành `ApiError`.
   - **`callApi`:** Hàm bọc gọi API tiện lợi, tự động phân loại Query Params (cho `GET`, `DELETE`) hoặc Body Data (cho `POST`, `PUT`, `PATCH`), trả về đối tượng `ApiResponse<T>` đồng nhất.

4. **Tích Hợp Giao Diện Hiện Đại:**
   - Sự kết hợp giữa **Ant Design** (Component UI chuẩn CMS) và **TailwindCSS v4** (Tùy biến layout nhanh chóng).

---

## 🔐 Hướng Dẫn Sử Dụng Phân Quyền (RBAC / PBAC)

Hệ thống hỗ trợ cả phân quyền theo **Vai trò (Role-Based Access Control)** và **Quyền hạn chi tiết (Permission-Based Access Control)**.

### 1. Khai báo danh sách Quyền (`src/constants/permissions.ts`)

```ts
export const PERMISSIONS = {
    PRODUCT_VIEW: 'product:view',
    PRODUCT_CREATE: 'product:create',
    PRODUCT_UPDATE: 'product:update',
    PRODUCT_DELETE: 'product:delete',

    ORDER_VIEW: 'order:view',
    ORDER_UPDATE: 'order:update',
} as const;
```

---

### 2. Phân quyền trên Giao diện (Ẩn/Hiện Component)

#### Cách A: Dùng Component `<CanAccess>`

```tsx
import { CanAccess } from '@/components/common/CanAccess';
import { PERMISSIONS } from '@/constants/permissions';
import { Button } from 'antd';

export function ProductActions() {
    return (
        <div>
            {/* Chỉ hiển thị nút Thêm nếu có quyền product:create */}
            <CanAccess permission={PERMISSIONS.PRODUCT_CREATE}>
                <Button type="primary">Thêm sản phẩm</Button>
            </CanAccess>

            {/* Hiển thị nút thay thế nếu không có quyền */}
            <CanAccess 
                permission={PERMISSIONS.PRODUCT_DELETE} 
                fallback={<span>Không có quyền xóa</span>}
            >
                <Button danger>Xóa</Button>
            </CanAccess>
        </div>
    );
}
```

#### Cách B: Dùng Hook `usePermission`

```tsx
import { usePermission } from '@/hooks/usePermission';
import { PERMISSIONS } from '@/constants/permissions';

export function ProductHeader() {
    const { can, canAny, canAll } = usePermission();

    if (!can(PERMISSIONS.PRODUCT_VIEW)) {
        return null;
    }

    return (
        <div>
            <h1>Quản lý sản phẩm</h1>
            {canAny([PERMISSIONS.PRODUCT_CREATE, PERMISSIONS.PRODUCT_UPDATE]) && (
                <button>Thao tác chỉnh sửa</button>
            )}
        </div>
    );
}
```

---

### 3. Phân quyền trên Đường dẫn (Route Guard với `ProtectedRoute`)

Bảo vệ đường dẫn trong `src/app/router/routes.tsx`:

```tsx
import { ProtectedRoute } from '@/app/router/ProtectedRoutes';
import { PERMISSIONS } from '@/constants/permissions';

export const routes = [
    // 1. Chỉ yêu cầu ĐĂNG NHẬP
    {
        element: <ProtectedRoute />,
        children: [
            { path: '/dashboard', element: <DashboardPage /> },
        ],
    },

    // 2. Yêu cầu Quyền cụ thể (Permission)
    {
        element: <ProtectedRoute permission={PERMISSIONS.PRODUCT_VIEW} />,
        children: [
            { path: '/products', element: <ProductListPage /> },
        ],
    },

    // 3. Yêu cầu Vai trò cụ thể (Role)
    {
        element: <ProtectedRoute roles={['ADMIN', 'MANAGER']} />,
        children: [
            { path: '/settings', element: <SettingsPage /> },
        ],
    },
];
```

---

## 📡 Hướng Dẫn Viết API Service

### Khai báo Service (`src/services/product.service.ts`)

```ts
import { callApi } from '@/core/callApi';
import { PaginatedResponse } from '@/core/api-response';

export interface Product {
    id: string;
    name: string;
    price: number;
}

export const productService = {
    // GET: /api/products?page=1&pageSize=10
    getProducts: (params?: { page?: number; pageSize?: number }) => {
        return callApi<PaginatedResponse<Product>>('/api/products', params, 'get');
    },

    // POST: /api/products
    createProduct: (data: Partial<Product>) => {
        return callApi<Product>('/api/products', data, 'post');
    },

    // DELETE: /api/products/:id
    deleteProduct: (id: string) => {
        return callApi<boolean>(`/api/products/${id}`, null, 'delete');
    },
};
```

---

## 🚀 Cài Đặt & Khởi Chạy

```bash
# 1. Cài đặt các thư viện phụ thuộc
pnpm install

# 2. Chạy môi trường Development
pnpm dev

# 3. Kiểm tra kiểm thử & Biên dịch Production
pnpm build
```
