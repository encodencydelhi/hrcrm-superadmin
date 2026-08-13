"use client";

import { ReactNode } from "react";

export interface TableCardColumn<T> {
    key: string;
    header: ReactNode;
    headerClassName?: string;
    cellClassName?: string;
    render: (row: T) => ReactNode;
}

interface TableCardProps<T> {
    title: ReactNode;
    description?: ReactNode;
    headerActions?: ReactNode;
    columns: TableCardColumn<T>[];
    data: T[];
    keyExtractor: (row: T) => string | number;
    footer?: ReactNode;
    note?: ReactNode;
    fullHeight?: boolean;
    className?: string;
}

export default function TableCard<T>({
    title,
    description,
    headerActions,
    columns,
    data,
    keyExtractor,
    footer,
    note,
    fullHeight = false,
    className = "",
}: TableCardProps<T>) {
    return (
        <div
            className={`bg-white rounded-lg border border-zinc-200 shadow-sm ${
                fullHeight ? "flex flex-col h-full" : ""
            } ${className}`}
        >
            {/* HEADER */}
            <div className="px-3 py-2 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="text-[12px] font-bold text-zinc-900">{title}</h3>
                    {description && (
                        <p className="text-[10px] text-zinc-500 mt-0.5">{description}</p>
                    )}
                </div>
                {headerActions && (
                    <div className="flex items-center gap-2">{headerActions}</div>
                )}
            </div>

            {/* TABLE */}
            <div className={`overflow-x-auto ${fullHeight ? "flex-1" : ""}`}>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-3 py-2 text-[10px] font-bold text-zinc-700 border-b border-zinc-100 ${
                                        col.headerClassName ?? ""
                                    }`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-3 py-6 text-center text-[11px] text-zinc-400"
                                >
                                    No records found.
                                </td>
                            </tr>
                        )}
                        {data.map((row) => (
                            <tr
                                key={keyExtractor(row)}
                                className="hover:bg-zinc-50/50 transition-colors group"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-3 py-2 align-top ${col.cellClassName ?? ""}`}
                                    >
                                        {col.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* FOOTER (pagination etc.) */}
            {footer && (
                <div className="mt-auto px-3 py-2 border-t border-zinc-100 flex items-center justify-between bg-zinc-50 rounded-b-lg">
                    {footer}
                </div>
            )}

            {/* NOTE (info strip below table) */}
            {note && (
                <div className="flex items-start gap-2 rounded-lg bg-zinc-50 border border-zinc-200 p-2 m-3 mt-0">
                    {note}
                </div>
            )}
        </div>
    );
}