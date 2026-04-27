貢獻指南
========

工作流程
--------

1. 先判斷變更屬於哪個子系統。
2. 閱讀相鄰實作和測試。
3. 確認變更是否影響執行期行為、schema、UI、文件或維運流程。
4. 保持 patch 聚焦，不做無關重構。

提交訊息
--------

推薦格式：

.. code-block:: text

   <type>(<scope>): <short summary>

常用類型包括 ``build``、``ci``、``docs``、``feat``、``fix``、``perf``、``refactor`` 和 ``test``。摘要使用祈使句、現在式，不以句號結尾。

程式碼完整性
------------

* 發布版本時優先使用簽名 commit 和簽名 tag。
* 不提交密鑰、本機資料庫狀態或建置產物。
* 依賴變更應和原始碼變更一樣認真審查。
* 非平凡變更應在分支上開發，並通過測試和文件建置。

提交前檢查
----------

.. code-block:: bash

   pnpm lint
   pnpm test
   make -C Documentation html
