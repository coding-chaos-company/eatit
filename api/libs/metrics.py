class GumtreeWeight:
    def __analysis_gumtree(self, gumtree_result: dict):

        action_counts = {"insert-node": 0, "delete-node": 0, "update-node": 0, "move-node": 0,
                        "insert-tree": 0, "delete-tree": 0, "update-tree": 0, "move-tree": 0}

        statistics = {"matches": len(gumtree_result["matches"]), "actions": action_counts}

        # JSONデータ内の各エントリをループし、各アクションの出現回数をカウントする
        for entry in gumtree_result["actions"]:
            action = entry.get('action')
            if action in action_counts:
                statistics["actions"][action] += 1
            else:
                statistics["actions"][action] = 1
        
        return statistics
    
    def get_gumtree_weight(self, gumtree_result: dict):
        changes = 0
        statistics = self.__analysis_gumtree(gumtree_result)
        for num in statistics["actions"].values():
            print(num)
            changes += num
        move_rate = (statistics["actions"]["move-node"] + statistics["actions"]["move-tree"]) / changes
        update_rate = (statistics["actions"]["update-node"] + statistics["actions"]["update-tree"]) / changes
        insert_num = statistics["actions"]["insert-node"] + statistics["actions"]["insert-tree"]
        delete_num = statistics["actions"]["delete-node"] + statistics["actions"]["delete-tree"]
        
        if move_rate > 0.5 or update_rate > 0.8:
            return 0.5
        elif insert_num <= delete_num:
            return 1.0
        else:
            return 1.5